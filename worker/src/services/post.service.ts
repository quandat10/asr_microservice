/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { injectable } from "inversify"
import { Logger } from "winston"

// import getDecorators from "inversify-inject-decorators"
import DbRedis from "@/components/db.redis"
import { container } from "@/components/di.container"

import { LoggerService } from "./logger.service"
import TYPES from "./types"

@injectable()
export default class ZetaMainApiService {
    redis: DbRedis
    logger: Logger

    constructor() {
        const loggerService: LoggerService = container.get(TYPES.loggerService)
        this.logger = loggerService.getLogger()

        this.redis = new DbRedis()
    }

    async isTrancodeComplete(ids: string[]): Promise<boolean> {

        //
        return true;
    }
}