import { Property } from "src/utils/general.util";

import { BaseDto } from "../base/base.dto";

class Obj { }

export class ContextSentryDto extends BaseDto<Obj> {
    @Property()
    url?: string

    @Property()
    query?: BaseDto<unknown>

    @Property()
    body?: BaseDto<unknown>

    @Property()
    cookie?: string

    @Property()
    method?: string

    @Property()
    userAgent?: string
}
