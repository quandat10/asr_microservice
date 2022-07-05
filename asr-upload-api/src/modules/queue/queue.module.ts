import { parseRedisUrl } from "parse-redis-url-simple";
import { MessageComponent } from "src/components/message.component";
import { LoggerModule } from "src/logger/logger.module";

import { BullModule } from "@nestjs/bull";
import {
  Global,
  Module,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([]),
        BullModule.forRootAsync({
            useFactory: async (configService: ConfigService) => (() => {
                const config = parseRedisUrl(configService.get("redisUri"))[0]

                const configRedis = Object.assign(config, { db: configService.get<number>("REDIS_DB_QUEUE") })

                return {
                    redis: configRedis
                }
            })(),
            inject: [ConfigService]
        }),
        BullModule.registerQueue(
            {
                name: "upload_asr",
            },
        ),
        LoggerModule,

    ],
    exports: [BullModule],
    providers: [MessageComponent,]
})

export class AsrQueueModule { }
