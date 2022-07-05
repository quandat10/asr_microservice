import { Property } from "@/utils/general.util"

import { BaseDto } from "./base.dto"

class DataDto {
    @Property()
    type: string

    @Property()
    data: [number]
}

export class UploadAsrDto extends BaseDto {
    @Property()
    name: string

    @Property()
    data: DataDto

}