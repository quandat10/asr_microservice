import appConfig from 'config/app.config';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerService } from './kafka/consumer.service';
import { KafkaConsumer } from './kafka/kafka.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
  }),
  ],
  controllers: [AppController],
  providers: [AppService,KafkaConsumer,ConsumerService],
})
export class AppModule {}
