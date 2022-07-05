import {
  Injectable,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ConsumerService } from "./consumer.service";

@Injectable()
export class KafkaConsumer implements OnModuleInit {
    constructor(
        private readonly configService: ConfigService,
        private readonly consumerService: ConsumerService
    ) { }

    async onModuleInit() {
        console.log("here")
        // await this.consumerService.consume(
        //     { topic: this.configService.get("TOPIC") },
        //     {
        //         eachMessage: async ({ topic, partition, message }) => {
                    
        //             setTimeout(()=>{
        //                 console.log({
        //                     value: message.value.toString(),
        //                     topic: topic.toString(),
        //                     partition: partition.toString(),
        //                 });
        //                 console.log("delay 5s")},5000)
        //         },
        //     },
        // );

        // await this.consumerService.kafkaStreamsConsumer()
    }
}
