import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const token = await this.authService.login(createUserDto);
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return { token };
  }
}
