import { Context } from "#/core"
import { ObjectDoesNotExist, ValidationError } from "#/errors"
import { isEnv } from "@/configs/config"
import { DatabaseError } from "@/exceptions/database-error"
import { ServiceCallError } from "@/exceptions/service.call.error"

const output = (ctx: Context, err: Record<string, unknown>) => {

    if (isEnv("production")) {
        ctx.end(parseInt(<string>err.httpCode, 10) || 400, {
            message: err.message,
            httpCode: err.httpCode,
            code: err.code
        })
    } else {
        ctx.end(parseInt(<string>err.httpCode, 10) || 400, {
            message: err.message,
            httpCode: err.httpCode,
            cause: err.cause,
            code: err.code
        })
    }
}

const ErrorHandler = (ctx: Context, err: Record<string, unknown>): Promise<boolean> => {
    switch (true) {
        case err instanceof DatabaseError:
            output(ctx, err)
            return Promise.resolve(true)

        case err instanceof ObjectDoesNotExist:
            console.log("Debug:", err)

            output(ctx, err)
            return Promise.resolve(true)

        case err instanceof ValidationError:
            console.log("Debug:", err)

            output(ctx, err)
            return Promise.resolve(true)

        case err instanceof ServiceCallError:
            console.log("Debug:", err)

            output(ctx, err)
            return Promise.resolve(true)

        default:
            if (err.message !== "server overload") {
                // console.log("other Debug:", err)
                if (isEnv("production")) {
                    ctx.end(400, {
                        message: err.message
                    })
                } else {
                    ctx.end(400, err)
                }
            } else {
                output(ctx, err)
            }

            return Promise.resolve(false)
    }
}

export default ErrorHandler
