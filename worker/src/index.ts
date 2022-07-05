/* tslint:disable:ordered-imports */
import "reflect-metadata"

import { NVK } from "#/core"
import { registerMiddleware } from "#/route"

import { container } from "@/components/di.container"
import controllers from "@/controllers"
import { LoggerService } from "@/services/logger.service"
import TYPES from "@/services/types"

import DbMysql from "./components/db-mysql"
// import RabbitMqClient from "./components/rabbitmq"
import DbRedis from "./components/db.redis"
import RabbitMqClient from "./components/rabbitmq"
import SentryComponent from "./components/sentry"
import ErrorHandler from "./middlewares/error.handler.middleware"

const loggerService: LoggerService = container.get(TYPES.loggerService)
const logger = loggerService.getLogger()
const dbRedis: DbRedis = container.get(TYPES.dbRedis)

const app = new NVK()

registerMiddleware("error_handler", "", ErrorHandler)

function terminate(exitCode: number) {
    return () => {
        console.log("Terminating...")
        app.close().then(() => {
            DbMysql
                .disconnect()
                .then(async () => {
                    await dbRedis.disconnect()
                    process.exit(exitCode)
                }).catch(e => {
                    console.log("Debug error :", e)
                })
        }).catch(e => {
            console.log("Debug error :", e)
        })
    }
}

process.on("SIGINT", () => {
    console.log("PID: ", process.pid)
    terminate(0)()
})
process.on("SIGTERM", terminate(0))
process.on("SIGUSR1", terminate(1))

DbMysql.connect()
    .then(() => {
        // connect rabbi
        RabbitMqClient.connect()

        app.initRoute(controllers.map(controller => controller as unknown))
    })
    .then(async () => {
        SentryComponent.init()
        dbRedis.connect()
    })
    .then(() => {
        app.listen("0.0.0.0", 3000, () => {
            console.log("Started server on port 3000")
        })
    }).catch(err => {
        logger.error("Error while starting up server", err)

        terminate(1)()
    })

