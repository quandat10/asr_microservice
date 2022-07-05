import { Upload } from "src/entities/Upload";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from "@nestjs/common";
import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get<string>("databaseHost"),
                port: configService.get<number>("databasePort"),
                username: configService.get<string>("databaseUsername"),
                password: configService.get<string>("databasePassword"),
                database: configService.get<string>("databaseName"),
                entities: [
                    Upload
                ],
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule { }
