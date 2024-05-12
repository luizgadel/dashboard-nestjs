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
  
  @Injectable()
  export class UsersService {
    private logger = new Logger();
    
    constructor() {}

    async createUser(createUser: CreateUserDTO): Promise<UserEntity> {
      try {
        const user = await sql`INSERT INTO users (name, password) VALUES (${createUser.name}, ${createUser.password}) RETURNING *`
        return new UserEntity(user.rows[0].id, createUser.name, createUser.password);
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
        return users.rows.map(user => new UserEntity(user.id, user.name, user.password));
      } catch (err) {
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }

    async updateUser(user: CreateUserDTO, id: number): Promise<UserEntity> {
      try {
        console.log('wip')
        return new UserEntity(id, user.name, user.password);
      } catch (err) {
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }

    async findOne(name: string): Promise<UserEntity> {
      try {
        const user = await sql`SELECT * FROM users WHERE name = ${name}`
        return new UserEntity(user.rows[0].id, user.rows[0].name, user.rows[0].password);
      }	catch (err) {
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }
  }
  