import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 9998,
    },
  });
  app.listen(() => logger.log('Microservice Auth is listening'));
}
bootstrap();
