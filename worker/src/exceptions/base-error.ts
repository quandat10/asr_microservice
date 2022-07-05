/**
 *
 * @export
 * @class BaseError
 * @extends {Error}
 */
export class BaseError extends Error {
    httpCode: number
    code: number
    message: string
    cause: string | Record<string, unknown>

    constructor(message?: string, cause?: string | Record<string, unknown>, httpCode?: number, code?: number, stack?: string) {
        super(message)

        this.cause = cause
        this.httpCode = httpCode
        this.code = code
        this.stack = stack

        Object.setPrototypeOf(this, new.target.prototype)
    }
}
