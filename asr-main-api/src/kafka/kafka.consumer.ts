import { Kafka } from 'kafkajs';

import {
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConsumerService } from './consumer.service';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
    constructor(
        private readonly configService: ConfigService,
        private readonly consumerService: ConsumerService
    ) { }

    private readonly kafka = new Kafka({
        brokers: [this.configService.get("KAFKA_BROKER")],
    });

    async onModuleInit() {
        console.log("here")
        await this.consumerService.consume(
            { topic: this.configService.get("TOPIC") },
            // {
            //     eachMessage: async ({ topic, partition, message }) => {
            //         console.log("hello world!");
            //         const consumer = this.kafka.consumer({ groupId: this.configService.get("TOPIC") });

            //         consumer.pause([{ topic }])
            //         setTimeout(() => consumer.resume([{ topic }]), 3000)
            //         // PythonShell.run('src/train.py', {
            //         //     args: [message.value.toString()]
            //         // }, function (err, results) {
            //         //     if (err)
            //         //         throw err;
            //         //     console.log(results);
            //         // });
            //         //   console.log(message.value.toString())
            //         // setTimeout(()=>{
            //         //     console.log({
            //         //         value: message.value.toString(),
            //         //         topic: topic.toString(),
            //         //         partition: partition.toString(),
            //         //     });
            //         //     console.log("delay 5s")},5000)
            //     },
            // },
        );

        // await this.consumerService.kafkaStreamsConsumer()
    }
}
