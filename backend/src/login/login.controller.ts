import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginGuard } from './auth/login.guard';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }

  @UseGuards(LoginGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      message: 'Usuário autenticado com sucesso!',
      user: req.user,
    };
  }
}
