import {Context, Get} from "#/core"
import BaseController from "@/controllers/base.controller"

export default class HealthController  extends BaseController {
    @Get("/healthz")
    async healthz(ctx: Context): Promise<void> {
        ctx.end(200, {
            "success": true
        })
    }
}
