import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt'
import { z } from 'zod';


@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string): Promise<any> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse({ email, password })

        if (parsedCredentials.success) {
          const user = await this.usersService.findByEmail(email);
          const passwordsMatch = await compare(password, user?.password);
          if (!passwordsMatch) {
            throw new UnauthorizedException();
          }
          const payload = { username: user.name, sub: user.id };
          return {
            access_token: await this.jwtService.signAsync(payload),
          }
          
        } else throw new UnauthorizedException();
      }   
}
