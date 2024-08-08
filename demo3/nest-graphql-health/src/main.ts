// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
