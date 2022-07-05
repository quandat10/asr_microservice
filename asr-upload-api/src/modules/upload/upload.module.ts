import { RateLimiterModule } from "nestjs-rate-limiter";
import { MessageComponent } from "src/components/message.component";
import RedisComponent from "src/components/redis.component";
import { LoggerService } from "src/logger/custom.logger";

import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisModule } from "@svtslv/nestjs-ioredis";

import { ProducerService } from "../kafka/producer.service";
import { AsrQueueModule } from "../queue/queue.module";
import { MessagingService } from "../rmq/message.service";
import { UploadController } from "./upload.controller";
import { UploadRepository } from "./upload.repository";
import { UploadService } from "./upload.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UploadRepository]),
        RedisModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                console.log("Debug", configService.get("redisUri"));
                return {
                    config: {
                        url: configService.get("redisUri"),
                    },
                };
            },
            inject: [ConfigService],
        }),
        // RabbitMQModule.forRootAsync(RabbitMQModule, {
        //     useFactory: (configService: ConfigService) => ({
        //         uri: configService.get("rabbitmqUri"),
        //         exchanges: [
        //             {
        //                 name: configService.get("exchangeName"),
        //                 type: configService.get("exchangeType"),
        //             },
        //         ],
        //     }),
        //     inject: [ConfigService],
        // }),
        UploadModule,
        ConfigService,
        LoggerService,
        RateLimiterModule,
        AsrQueueModule
    ],
    providers: [UploadService, MessagingService, MessageComponent, RedisComponent,ProducerService],
    exports: [TypeOrmModule, UploadService],
    controllers: [UploadController],
})

export class UploadModule { }
