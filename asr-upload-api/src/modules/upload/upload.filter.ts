/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request } from 'express';
import { MessageComponent } from 'src/components/message.component';
import { ErrorCodes } from 'src/constants/error-code.const';

import { BadRequestException } from '@nestjs/common';

export const uploadFilter = (req: Request, file: Express.Multer.File,
    callback: (error: Error, acceptFile: boolean) => void): void => {
    if (isValidFile(file)) callback(null, true)
    else callback(new BadRequestException({
        message: new MessageComponent().lang("NOT_IMAGE", req.headers["x-asr-lang"] as string),
        cause: "File is not an image or PDF",
        errorCode: ErrorCodes.NOT_IMAGE
    }
    ), false)
}

export const setDirectory = (req: Request, file: Express.Multer.File,
    callback: (error: Error, destination: string) => void): void => {

    const now = new Date();

    const month = String(now.getMonth() + 1).padStart(2, "0")
    const year = String(now.getFullYear()).padStart(2, "0");
    const path = "public/images/" + month + "-" + year
    console.log(path);

    callback(null, path);
}

function isValidFile(file: Express.Multer.File): boolean {

    return (file.mimetype.includes("image") || file.mimetype.includes("pdf"))
}