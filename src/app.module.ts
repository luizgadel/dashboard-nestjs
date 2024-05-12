import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule } from './datasource/typeorm.module';
import { UsersModule } from './users/users.module';
// import { DataSourceModule } from './datasource/datasource.module';
import { LoggerMiddleware } from './middlewares/logging';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // TypeOrmModule, DataSourceModule, 
    UsersModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL})
  }
}
