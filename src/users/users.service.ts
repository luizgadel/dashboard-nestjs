// users.service.ts
import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
  } from '@nestjs/common';
  import { DataSource } from 'typeorm';
  import { UserEntity } from './users.entity';
  import {
    UsernameQuery,
  } from 'src/datasource/datasource.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
  
  @Injectable()
  export class UsersService {
    private userRepository;
    private customUserRepository;
    private logger = new Logger();
    
    constructor(
      private dataSource: DataSource,
    ) {
      this.userRepository = this.dataSource.getRepository(UserEntity);
    }

    async createUser(createUser: CreateUserDTO): Promise<UserEntity> {
      try {
        const user = await this.userRepository.create(createUser);
        return await this.userRepository.save(user);
      } catch (err) {
        if (err.code == 23505) {
          this.logger.error(err.message, err.stack);
          throw new HttpException('Username already exists', HttpStatus.CONFLICT);
        }
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }

    async getAll(): Promise<UserEntity[]> {
      try {
        return await this.userRepository.find();
      } catch (err) {
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }

    async updateUser(user: CreateUserDTO, id: number): Promise<UserEntity> {
      try {
        await this.userRepository.update(id, user);
        return new UserEntity(id, user.username, user.password);
      } catch (err) {
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }

    async filterByUsername(usernameQuery: UsernameQuery): Promise<UserEntity[]> {
      try {
        return await this.customUserRepository.filterUser(usernameQuery);
      } catch (err) {
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }
  }
  