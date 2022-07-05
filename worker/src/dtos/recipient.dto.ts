import { Property } from "@/utils/general.util"

import { BaseDto } from "./base.dto"

export class Recipient extends BaseDto {
    @Property()
    includedExternaluserIds: string[]

    @Property()
    includedPlayerIds: string[]

    @Property()
    includedSegments: string[]
}