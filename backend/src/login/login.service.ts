import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const user = await this.findByEmail(email);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      // Gerar token JWT
      const payload = { 
        sub: user.id,
        email: user.email 
      };
      
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email
          // Outros campos do usuário que queira retornar (exceto a senha)
        }
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Erro de login:', error);
      throw new InternalServerErrorException('Erro interno no servidor');
    }
  } 

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return user; // Retorna null se não encontrar
    } catch (error) {
      console.error('Erro ao consultar o banco de dados:', error);
      throw new InternalServerErrorException('Erro ao consultar o banco de dados');
    }
  }
}