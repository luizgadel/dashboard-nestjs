import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto'
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<void> {
    // Add your registration logic here, like saving the user to the database
    // Make sure to hash the password before saving
  }

  async login(userDto: CreateUserDto): Promise<string | null> {
    const user = await this.userService.findByUsername(userDto.username);
    if (!user || !compareSync(userDto.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
