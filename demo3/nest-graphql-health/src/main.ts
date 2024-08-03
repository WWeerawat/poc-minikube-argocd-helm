// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];

  signals.forEach((signal) => {
    process.on(signal, async () => {
      this.logger.log(`Received ${signal}. Shutting down gracefully...`);
      await server.close();
      process.exit(0);
    });
  });

  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
