import axios from "axios"
import { injectable } from "inversify"
import { Logger } from "winston"

import { ErrorCodes } from "@/constants/error-code.const"

import DbRedis from "../components/db.redis"
import { container } from "../components/di.container"
import { ServiceCallError } from "../exceptions/service.call.error"
import { LoggerService } from "./logger.service"
import TYPES from "./types"

// import getDecorators from "inversify-inject-decorators"

// const { lazyInject } = getDecorators(container)

// noinspection JSUnusedGlobalSymbols
@injectable()
export default class ExternService {
    redis: DbRedis
    logger: Logger

    constructor() {
        const loggerService: LoggerService = container.get(TYPES.loggerService)
        this.logger = loggerService.getLogger()

        this.redis = new DbRedis()
    }


    /**
     * @param userId
     * @param fields
     * @returns Promise<User[]>
     */
    async getTopStrade(): Promise<unknown> {

        try {
            const headers = { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
            // type=HSX&typeTab=M&sort=SortName-up
            const params = { type: "HSX", typeTab: "M", sort: "SortName-up" }
            const url = "http://price2.tvsi.com.vn/get-detail-stock-by"

            const start = Date.now()
            axios.defaults.timeout = 1500
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { data: result } = await axios.post(url, {}, {
                params,
                headers
            })

            const time = Date.now() - start
            if (time > 100) {
                this.logger.info(`${time}ms `, url, params)
            }

            return result as unknown
        } catch (error) {
            let httpCode = 500
            console.log("Debug", error)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (error && error.response && error.response.data) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                httpCode = error.response.status
            }

            // this.logger.info(`Cannot get user info!${userId}`, error)

            throw new ServiceCallError(
                "Cannot get user info",
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                (error.response && error.response.data) || "getUserInfo error",
                httpCode,
                ErrorCodes.USER_NOT_EXIST_OR_IS_BLOCKING
            )
        }
    }
}
