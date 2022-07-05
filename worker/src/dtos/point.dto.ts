import { Property } from "@/utils/general.util"

import { BaseDto } from "./base.dto"

export class Point extends BaseDto {
    @Property()
    latitude: number

    @Property()
    longitude: number
}
