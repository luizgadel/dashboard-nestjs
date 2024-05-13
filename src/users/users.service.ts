// users.service.ts
import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { UserEntity } from './users.entity';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { sql } from '@vercel/postgres';
import { hash } from 'bcrypt'
  
  @Injectable()
  export class UsersService {
    private logger = new Logger();
    
    constructor() {}

    async createUser(createUser: CreateUserDTO): Promise<UserEntity> {
      try {
        createUser.password = await hash(createUser.password, 10)
        const result = await sql`INSERT INTO users (name, email, password) VALUES (${createUser.name}, ${createUser.email}, ${createUser.password}) RETURNING *`
        const user = result.rows[0]
        return new UserEntity(user.id, user.name, user.email, user.password);
      } catch (err) {
        if (err.code == 23505) {
          this.logger.error(err.message, err.stack);
          throw new HttpException('name already exists', HttpStatus.CONFLICT);
        }
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }

    async getAll(): Promise<UserEntity[]> {
      try {
        const users = await sql`SELECT * FROM users`
        return users.rows.map(
          user => new UserEntity(user.id, user.name, user.email, user.password)
        );
      } catch (err) {
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }

    async updateUser(user: CreateUserDTO, id: string): Promise<UserEntity> {
      try {
        user.password = await hash(user.password, 10)
        await sql`
          UPDATE users 
          SET name = ${user.name}, email = ${user.email}, password = ${user.password} 
          WHERE id = ${id}
        `
        return new UserEntity(id, user.name, user.email, user.password);
      } catch (err) {
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }

    async findByEmail(email: string): Promise<UserEntity> {
      try {
        const result = await sql`SELECT * FROM users WHERE email = ${email}`
        const user = result.rows[0]
        return new UserEntity(user.id, user.name, user.email, user.password);
      }	catch (err) {
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }
  }
  