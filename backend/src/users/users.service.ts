import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 12;
    const hashedPassword = bcrypt.hashSync(createUserDto.password, saltRounds);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    if(updateUserDto.password) {
      const saltRounds = 12;
      const hashedPassword = bcrypt.hashSync(updateUserDto.password, saltRounds);
      updateUserDto.password = hashedPassword;
    }
    const updatedUser = Object.assign(user, updateUserDto);
    await this.usersRepository.update(id, updatedUser);
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    await this.usersRepository.delete(id);
  }
}
