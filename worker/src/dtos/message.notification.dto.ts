import {
  IsObject,
  IsOptional,
  IsString,
} from "class-validator"

import { Property } from "@/utils/general.util"

import { NotifcationDto } from "./notification.dto"

export class MessageNotificationDto {

    @IsOptional()
    @IsString()
    @Property()
    exchangeName: string

    @IsOptional()
    @IsString()
    @Property()
    messageVersion: string

    @IsOptional()
    @IsString()
    @Property()
    issuer: string

    @IsOptional()
    @IsString()
    @Property()
    issueAt: number

    @IsOptional()
    @IsString()
    @Property()
    routingKey: string

    @IsObject()
    @Property()
    message: NotifcationDto
}