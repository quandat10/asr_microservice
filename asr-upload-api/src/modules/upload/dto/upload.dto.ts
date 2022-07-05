import { BaseDto } from "src/base/base.dto";
import { Upload } from "src/entities/Upload";
import { Property } from "src/utils/general.util";

export class UploadDto extends BaseDto<Upload>{
    @Property()
    originalName: string

    @Property()
    cloudFileName: string

    @Property()
    encoding: string

    @Property()
    mimetype: string

    @Property()
    bucket: string

    @Property()
    size: number

    @Property()
    userCode: string

    @Property()
    linkUrl: string
}