import Context from "#/entites/context"

export type Func1 = (ctx: Context) => boolean
export type Func2 =  (ctx: Context) => Promise<boolean>
export type Func = Func1 | Func2
export interface MiddlewareInterface {
    methodName: string
    method: string
    func: Func
}

export class Middleware implements MiddlewareInterface {
    methodName: string
    method: string
    func: Func
    isAsync: boolean

    /**
     * @param methodName
     * @param method
     * @param func
     */
    constructor(
        methodName: string,
        method: string,
        func: Func
    ) {
        this.methodName = methodName
        this.method = method
        this.func = func
        this.isAsync = func.constructor.name === "AsyncFunction"
    }
}
