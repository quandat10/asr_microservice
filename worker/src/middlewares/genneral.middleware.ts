import queryString from "query-string"
import { HttpCode } from "#/constants/http-code"
import { Context } from "#/core"
import { ErrorMessages } from "@/constants/message"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const parseQueryParams = async (ctx: Context) => {
    ctx.params = queryString.parse(ctx.request.getQuery())

    return true
}

const log = async (ctx: Context): Promise<boolean> => {
    console.log("console log c:", ctx.params)

    return true
}

// const after_fn = async (ctx: Context): Promise<boolean> => {
//     console.log("console log after_fn:", ctx.params)
//
//     return true;
// }

const validRequest = (ctx: Context): boolean => {

    if (ctx.state.role === "user") {
        if (ctx.state.userId <= 0) {
            ctx.response.writeStatus(HttpCode.FORBIDDEN)
            ctx.response.writeHeader("Content-Type", "text/json")

            ctx.response.end(JSON.stringify({
                success: true,
                code: 401,
                data: {
                    message: ErrorMessages.USER_NOT_PERMISSION
                }
            }))
        }
    }

    return true
}

const bodyParser = async (ctx: Context): Promise<boolean> => {
    let buffer: Buffer | Uint8Array | string
    let result = true

    const readBody = () => {
        const setResult = (error: ErrorConstructor) => {
            ctx.response.writeStatus(HttpCode.BAD_REQUEST)
            ctx.response.writeHeader("Content-Type", "text/json")

            ctx.response.end(JSON.stringify({
                success: true,
                code: 401,
                data: {
                    message: error.toString()
                }
            }))
        }

        return new Promise((resolve, reject) => {
            ctx.response.onData((ab, isLast) => {
                const chunk = Buffer.from(ab)
                if (isLast) {
                    let json: Record<string, unknown>
                    if (buffer) {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            json = JSON.parse(Buffer.concat([buffer as Uint8Array, chunk]).toString())
                        } catch (e) {
                            /* res.close calls onAborted */
                            // ctx.response.close();
                            setResult(e)
                            reject(new Error("Định dạng JSON không đúng."))
                            return
                        }
                        resolve(json)
                    } else {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            json = JSON.parse(chunk.toString())
                        } catch (e) {
                            /* res.close calls onAborted */
                            // ctx.response.close();
                            setResult(e)
                            reject(new Error("Định dạng JSON không đúng."))
                            return
                        }

                        resolve(json)
                    }
                } else {
                    if (buffer) {
                        buffer = Buffer.concat([buffer as Uint8Array, chunk])
                    } else {
                        buffer = Buffer.concat([chunk])
                    }
                }
            })

            ctx.response.onAborted(() => {
                reject(new Error("Định dạng JSON không đúng."))
            })
        })
    }

    try {
        // let userAgent = ctx.request.getHeader('user-agent');
        ctx.body = await readBody() as Record<string, unknown>
    } catch (e) {
        result = false
    }

    return Promise.resolve(result);
}

export { validRequest, parseQueryParams, log, bodyParser }
