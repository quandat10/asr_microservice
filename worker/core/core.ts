import NVK from "./nvk"
// import * as route from "./route"
import Context from "./entites/context"
import { PrefixController } from "./routes/prefix.decorator"
import { BaseEntity } from "./entites/base.entity"
import { property } from "./decorator"

export * from "./route"
export { NVK, Context, PrefixController, BaseEntity, property }
