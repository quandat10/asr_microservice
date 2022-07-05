import { injectable } from "inversify"
import * as winston from "winston"

@injectable()
export class LoggerService {
    private logger: winston.Logger

    constructor() {
        this.logger = winston.createLogger({
            level: "info",
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.timestamp(),
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                winston.format.printf(info => `[${info.timestamp}][${info.level}] - ${info.message}`)
            ),
            transports: [
                new winston.transports.Console()
            ]
        })
    }

    /**
     * get Logger
     */
    getLogger(): winston.Logger {
        return this.logger
    }
}
