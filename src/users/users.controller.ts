// users.controller.ts
import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/dto/create-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/create')
  @ApiBody({ type: CreateUserDTO})
  async signUp(@Body() user: CreateUserDTO): Promise<UserEntity> {
    return await this.userService.createUser(user);
  }

  // @Get('') // get request handler that returns the filtered results of the users table
  // async filterUser(
  //   @Query() usernameQuery: UsernameQuery // extracts the username query param for the endpoint url,
  // ): Promise<UserEntity[]> {
  //   return await this.userService.filterByUsername(usernameQuery);
  // }

  @Get('')
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  @Put('/update/:id')
  @ApiBody({ type: CreateUserDTO})
  async updateUser(
    @Query('id') id: number,
    @Body() user: CreateUserDTO,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(user, id);
  }
}