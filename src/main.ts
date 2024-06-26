import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  require('dotenv').config();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('This API has endpoints to manage users\' data')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('app')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
