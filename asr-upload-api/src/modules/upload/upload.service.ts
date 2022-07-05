/* eslint-disable @typescript-eslint/no-unsafe-call */
import gifFrames from "gif-frames";
import { BaseService } from "src/base/base.service";
import { ErrorCodes } from "src/constants/error-code.const";
import { Upload } from "src/entities/Upload";
import { DatabaseError } from "src/exceptions/errors/database.error";
import { LoggerService } from "src/logger/custom.logger";
import {
  DeleteResult,
  MoreThan,
  QueryFailedError,
} from "typeorm";
import { v1 as uuidv1 } from "uuid";

import { Bucket } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";

import { UploadDto } from "./dto/upload.dto";
import { UploadRepository } from "./upload.repository";

@Injectable()
export class UploadService extends BaseService<Upload, UploadRepository> {
    constructor(
        repository: UploadRepository,
        logger: LoggerService,
        // private readonly amqpConnection: AmqpConnection,
    ) {
        super(repository, logger)
    }
    async createUpload(uploadData: UploadDto): Promise<Upload> {
        try {
            const insert = await this.repository.createQueryBuilder()
                .insert()
                .values(uploadData)
                .execute()
            return new Upload({ ...insert.generatedMaps[0], ...uploadData })
        } catch (error: unknown) {
            if (error instanceof QueryFailedError) {
                throw new DatabaseError("INSERT_ERROR",
                    error as unknown as Record<string, unknown>,
                    ErrorCodes.INSERT_ERROR)
            }
            throw new DatabaseError("DATABASE_CONNECTION_ERROR",
                error as Record<string, unknown>,
                ErrorCodes.DATABASE_CONNECTION_ERROR)
        }
    }
    async deleteUpload(cloudFileName: string): Promise<DeleteResult> {
        try {
            return this.repository.delete({ cloudFileName: cloudFileName })
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new DatabaseError("DELETE_ERROR",
                    error as unknown as Record<string, unknown>,
                    ErrorCodes.DELETE_ERROR)
            }
            throw new DatabaseError("DATABASE_CONNECTION_ERROR",
                error as Record<string, unknown>,
                ErrorCodes.DATABASE_CONNECTION_ERROR)
        }
    }

    async findFile(fileName: string): Promise<Upload> {
        const result = await this.repository.findOne({ where: { cloudFileName: fileName } })
        if (!result) {
            throw new DatabaseError(
                "FILE_NOT_EXIST",
                "File doesn't exist",
                ErrorCodes.FILE_NOT_EXIST)
        }
        return result
    }

    async canUpload(userCode: string): Promise<boolean> {
        const uploadNotAllowed = new Date(Date.now() - (5 * 1000)).toISOString()
        const hasUploadedRecently = await this.repository.findOne({
            select: ["userCode", "createdAt"],
            where: {
                userCode: userCode,
                createdAt: MoreThan(uploadNotAllowed)
            },
            order: {
                createdAt: "DESC"
            }
        })

        return (hasUploadedRecently) ? false : true
    }

    async uploadFile(fileTarget: Express.Multer.File, storage: Bucket, userCode: string): Promise<Upload> {

        const originalName = fileTarget.originalname
        const fileType = fileTarget.originalname.split(".").pop();
        const fileTypeConver = fileType === "gif" || fileType === "GIF" ? "png" : fileType
        fileTarget.originalname = uuidv1() + "." + fileTypeConver

        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, "0")
        const year = String(now.getFullYear()).padStart(2, "0")

        let fileDirectory = ""

        if (fileTypeConver === "pdf") {

            fileDirectory = "CV/" + month + "-" + year + "/" + fileTarget.originalname
        } else {

            fileDirectory = month + "-" + year + "/" + fileTarget.originalname
        }


        const blob = storage.file(fileDirectory)

        const blobStream = blob.createWriteStream();

        blobStream.on("finish", () => {
            void blob.makePublic()
        });

        if (fileType === "gif") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            gifFrames({ url: fileTarget.buffer, frames: 0 }).then(function (frameData) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                blobStream.end(frameData[0].getImage()["_obj"])
            });
        } else {
            blobStream.end(fileTarget.buffer)
        }

        const uploadData = new UploadDto({
            originalName: originalName,
            cloudFileName: fileTarget.originalname,
            ...fileTarget,
            bucket: storage.name,
            userCode: userCode,
            linkUrl: `https://storage.googleapis.com/${storage.name}/${fileDirectory}`
        })

        const insert = await this.createUpload(uploadData)

        // await this.amqpConnection.publish("upload", "upload", {
        //     exchangeName: "upload",
        //     messageVersion: "v1.0",
        //     issuer: "asr_upload",
        //     routingKey: "upload",
        //     issueAt: Date.now(),
        //     message: insert
        // })

        return insert
    }
}
