import { Type } from "class-transformer"
import {
  IsJSON,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator"

export class ContentsDto {

    @IsString()
    en: string


    @IsString()
    vi: string

    @IsJSON()
    data: JSON
}

export class NotifcationDto {

    @IsOptional()
    @IsString({
        each: true
    })
    includedSegments: string[]

    @IsOptional()
    @IsUUID("4", { each: true })
    includedPlayerIds: string[]

    @IsOptional()
    includedExternaluserIds: string[]

    @ValidateNested()
    @Type(() => ContentsDto)
    contents: ContentsDto

    @IsOptional()
    url: string

    @IsOptional()
    category: string

    @IsOptional()
    appUrl: string

    @IsOptional()
    webUrl: string

    @IsOptional()
    @Type(() => ContentsDto)
    headings: ContentsDto

    @IsOptional()
    @Type(() => ContentsDto)
    subtitle: ContentsDto
}

