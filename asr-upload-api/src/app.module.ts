import { parseRedisUrl } from "parse-redis-url-simple";

import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";
import {
  APP_FILTER,
  Reflector,
} from "@nestjs/core";
import { SentryModule } from "@ntegral/nestjs-sentry";
import { LogLevel } from "@sentry/types";
import { RedisModule } from "@svtslv/nestjs-ioredis";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageComponent } from "./components/message.component";
import appConfig from "./configs/app.config";
import databaseConfig from "./configs/database.config";
import { DatabaseModule } from "./database/database.module";
import { AllExceptionFilter } from "./filter/exception.filter";
import { LoggerModule } from "./logger/logger.module";
import { ConsumerService } from "./modules/kafka/consumer.service";
import { KafkaConsumer } from "./modules/kafka/kafka.consumer";
import { AsrQueueModule } from "./modules/queue/queue.module";
import { MessagingService } from "./modules/rmq/message.service";
import { UploadModule } from "./modules/upload/upload.module";

@Module({
    imports: [
        SentryModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (cfg: ConfigService) => {
                console.log("sentry:", cfg.get("SENTRY_DSN"))
                return {
                    dsn: cfg.get("SENTRY_DSN"),
                    debug: true,
                    environment: "dev" || "production",
                    //   release: 'some_release', | null, // must create a release in sentry.io dashboard
                    logLevel: LogLevel.Verbose //based on sentry.io sublevel //
                }
            },
            inject: [ConfigService],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig],
        }),
        RedisModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                console.log("Debug", configService.get("redisUri"));
                return {
                    config: {
                        url: configService.get("redisUri"),
                        return_buffers: true
                    },
                };
            },
            inject: [ConfigService],
        }),
        BullModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                redis: Object.assign(
                    {},
                    parseRedisUrl(configService.get("redisUri")) || {},
                ),
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue({
            name: "audio",
        }),

        LoggerModule,
        DatabaseModule,
        UploadModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        ConsumerService,
        { provide: APP_FILTER, useClass: AllExceptionFilter },
        MessagingService,
        AsrQueueModule,
        MessageComponent,
        Reflector,
        KafkaConsumer
    ],
})

export class AppModule {


}
