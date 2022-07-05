import { Module } from '@nestjs/common';

import { ConsumerService } from './consumer.service';

@Module({
  // imports:[
  //   ClientsModule.register([
  //     {
  //       name: 'hello-world',
  //       transport: Transport.KAFKA,
  //       options: {
  //         client: {
  //           clientId: 'hero',
  //           brokers: ['localhost:9092'],
  //         },
  //         consumer: {
  //           groupId: 'asr_stream'
  //         }
  //       }
  //     },
  //   ]),
  // ],
  providers: [ ConsumerService],
  exports: [ ConsumerService],
})
export class KafkaModule {}
