import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from 'src/dto/sign-in.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { SkipAuth } from './decorators/skip-auth.decorator';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @SkipAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiProperty({ type: SignInDTO })
    signIn(@Body() signInDto: SignInDTO) {
        return this.authService.signIn(signInDto.name, signInDto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
