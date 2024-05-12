import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt'


@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
    ) {}

    async signIn(name: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(name);
        const passwordsMatch = await compare(pass, user?.password);
        if (!passwordsMatch) {
          throw new UnauthorizedException();
        }
        const payload = { username: user.name, sub: user.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
        }
    }   
}
