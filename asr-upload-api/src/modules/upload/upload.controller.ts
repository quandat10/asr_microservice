import { Queue } from "bull";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import multer from "multer";
import {
  RateLimit,
  RateLimiterInterceptor,
} from "nestjs-rate-limiter";
import {
  Token,
  TokenDto,
} from "src/base/token";
import { MessageComponent } from "src/components/message.component";
import RedisComponent from "src/components/redis.component";
import { Headers } from "src/decorators/header.decorator";
import { BaseError } from "src/exceptions/errors/base.error";
import { RolesGuard } from "src/validators/roles.guard";

import { InjectQueue } from "@nestjs/bull";
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
} from "@nestjs/swagger";

import { ProducerService } from "../kafka/producer.service";
import { UploadService } from "./upload.service";

@ApiBearerAuth()
@Headers()
@Controller("upload")
@UseGuards(RolesGuard)
export class UploadController {
    // private storage = new Storage({ keyFilename: process.env.GCS_KEYFILE }).bucket(process.env.GCS_BUCKET)
    constructor(
        private readonly producerService: ProducerService,
        private readonly uploadService: UploadService,
        private readonly configService: ConfigService,
        @InjectQueue("upload_asr") private jobQueue: Queue,
        private redis: RedisComponent,
        private i18n: MessageComponent) { }

    @Post()
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @RateLimit({
        keyPrefix: "upload",
        points: 1,
        duration: 5,
        errorMessage: "User cannot upload more than once in 5 seconds",
    })
    @UseInterceptors(RateLimiterInterceptor)
    @UseInterceptors(FileInterceptor("file", {
        storage: multer.memoryStorage(),
        // fileFilter: uploadFilter,
    }))
    async upload(
        @UploadedFile("file") file: Express.Multer.File,
        @Token() token: TokenDto
    ) {
        try {
            // const files = createReadStream(file);
            // await this.redis.set(file.originalname, file.buffer, 0)
            // console.log({
            //     name: file.originalname,
            //     data: file.buffer,
            //     // raw:Buffer.from(Uint8Array.from(Buffer.from(file.buffer))).toString('utf-8')
            // })

            await this.producerService.kafkaStreamsProduce(file.buffer)

            // await this.jobQueue.add({
            //     name: file.originalname,
            //     data: file.buffer
            // })
            // return await this.uploadService.uploadFile(file, this.storage, token.userCode)
        } catch (error) {
            if (error instanceof BaseError) throw new BadRequestException({
                message: this.i18n.lang(error.getMessage(), token.lang),
                cause: error.getCause(),
                errorCode: error.getErrorCode()
            })
            throw error
        }
    }

    @Get()
    async getHello(){
        await this.producerService.produce({
            topic: this.configService.get("TOPIC"),
            messages: [
              {
                value: 'Hello World',
              },
            ],
          });
          return 'Hello World!';
    }

    @Get("/hello")
    async getMessage(){
        // await this.producerService.kafkaStreamsProduce([1,2,3,4,5,6,7,8,9,10,11,12,13,15])

        return "Hello world"
    }

}
