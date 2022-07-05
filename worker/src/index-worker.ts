import NVK from "#/nvk"
import fs from "fs"

import MysqlDb from "./components/db-mysql"
import DbRedis from "./components/db.redis"
import { container } from "./components/di.container"
import { MessageComponent } from "./components/message.component"
import RabbitMqClient from "./components/rabbitmq"
import { LoggerService } from "./services/logger.service"
import TYPES from "./services/types"
import Worker from "./worker"

const loggerService: LoggerService = container.get(TYPES.loggerService)
const logger = loggerService.getLogger()
const dbRedis: DbRedis = container.get(TYPES.dbRedis)

// open mongoose connection
function terminate(exitCode: number) {
    return () => {
        logger.debug("Terminating...")
        Worker.stop()
            // eslint-disable-next-line @typescript-eslint/unbound-method
            .then(MysqlDb.disconnect)
            // eslint-disable-next-line @typescript-eslint/unbound-method
            .then(dbRedis.disconnect)
            // eslint-disable-next-line @typescript-eslint/unbound-method
            // .then(RabbitMqClient.disconnect)
            .then(() => {
                console.log("Debug:", "close connection")
                process.exit(exitCode)
            }).catch(e => {
                console.log("Debug error :", e)
            })
    }
}

// handle close
process.on("SIGINT", terminate(0))
process.on("SIGTERM", terminate(0))
process.on("SIGUSR1", terminate(1))

new NVK()

MysqlDb.connect()
    .then(() => {
        MessageComponent.init()
        // SentryComponent.init()
        console.log("Sentry connected:");
        // connect rabbi
        RabbitMqClient.connect()
    })
    .then(async () => {
        dbRedis.connect(true)
        // const client = await Mqtt.asyncConnect()
        // console.log("Mqtt connect:", client.connected);
    })
    .then(async () => {
        void await Worker.start()
    })
    .then(() => {
        const isWin = process.platform === "win32"

        setInterval(() => {
            if (!isWin) {
                fs.closeSync(fs.openSync("/tmp/alive", "w"))
            }
        }, 15000)
    }).catch(err => {
        logger.error("Error while starting up server", err)

        terminate(1)()
    })
