import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE_MAIN',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9999,
        },
      },
      {
        name: 'SERVICE_AUTH',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9998,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
