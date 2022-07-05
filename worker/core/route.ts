import {
  HttpRequest,
  HttpResponse,
  TemplatedApp,
} from "uWebSockets.js"

import { isEnv } from "@/configs/config"

import { ErrorMessages } from "./constants/message"
import Context from "./entites/context"
import {
  Func,
  Middleware,
} from "./entites/middleware"
import { State } from "./entites/state.entity"
import { ValidationError } from "./errors"
import {
  HttpMethod,
  IRouteDefinition,
} from "./routes/Route.definition"

type FuncErr = (ctx: Context, err: Record<string, unknown>) => Promise<boolean>

export default class Route {
    /** Store middlewares */
    static middlewares: Middleware[] = []
    static errorHandler?: FuncErr = null

    /**
     * @param {string} path Register action
     * @param {string} method
     * @param {Func} fncs
     */
    static httpMethodFunction(path: string, method: HttpMethod, fncs: Func[] = []) {
        return (target: Record<string, unknown>, propertyKey: string): void => {

            Route.middlewares.push(
                ...fncs.map(fnc => new Middleware(propertyKey, method, fnc))
            )

            // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
            // To prevent any further validation simply set it to an empty array here.
            if (!Reflect.hasMetadata("routes", target.constructor)) {
                Reflect.defineMetadata("routes", [], target.constructor)
            }

            // Get the routes stored so far, extend it by the new route and re-set the metadata.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const routes: IRouteDefinition[] = Reflect.getMetadata("routes", target.constructor)

            routes.push({
                methodName: propertyKey,
                path,
                requestMethod: method
            })

            Reflect.defineMetadata("routes", routes, target.constructor)
        }
    }

    /**
     * @param {TemplatedApp} server
     * @param {any} controllers
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static routesReflect(server: TemplatedApp, controllers: unknown[]) {
        controllers.forEach(controller => {
            // This is our instantiated class
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const instance = new controller()

            // The prefix saved to our controller
            let prefix = "";
            const str: unknown = Reflect.getMetadata("prefix", controller)

            if (str !== undefined) {
                prefix = str as string
            }

            // Our `routes` array containing all our routes for this controller
            let routes: null | IRouteDefinition[];
            const dataMaybe: unknown = Reflect.getMetadata("routes", controller)
            if (dataMaybe !== undefined) {
                routes = dataMaybe as IRouteDefinition[]
            }

            // Iterate over all routes and register them to our express application
            if (!routes) {
                return
            }

            routes.forEach(route => {
                const method = route.requestMethod.toLocaleLowerCase().toString()
                if (typeof server[method] === "function") {

                    const path = prefix + (route.path === "/" ? "" : route.path);

                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    server[method](path, async (res: HttpResponse, req: HttpRequest) => {
                        const middlewares = Route.middlewares.filter(
                            middleware => middleware.methodName === route.methodName && middleware.method === route.requestMethod
                        )

                        // // Run middlewares
                        /** @var ctx Context */
                        const ctx = new Context(req, res)

                        ctx.request.forEach((k, v) => {
                            ctx.header.set(k, v)
                        })

                        let countParameter = 0
                        let p: string = null

                        do {
                            p = ctx.request.getParameter(countParameter)

                            if (p) {
                                ctx.arguments.set(countParameter, p)
                            }

                            countParameter++
                        } while (p)

                        ctx.state = new State({
                            "role": ctx.header.get("x-zeta-role") || null,
                            "userId": parseInt(ctx.header.get("x-zeta-user-id"), 10) || 0,
                            "apiKey": ctx.header.get("x-zeta-api-key") || null
                        })

                        const before_middlewares = middlewares.filter(middleware => middleware.func.name.indexOf("after_") !== 0)
                        const after_middlewares = middlewares.filter(middleware => middleware.func.name.indexOf("after_") === 0)

                        if (before_middlewares.length > 0) {
                            let next = true
                            for (let i = 0; i < before_middlewares.length; i++) {
                                const ret = before_middlewares[i].isAsync ? await before_middlewares[i].func(ctx) : middlewares[i].func(ctx)

                                if (!ret) {
                                    next = false
                                    break
                                }
                            }

                            if (!next) return ctx
                        }

                        // Execute our method for this path and pass our express request and response object.
                        ctx.response.onAborted(() => {
                            ctx.response.aborted = true
                        })

                        try {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
                            await instance[route.methodName](ctx)

                            // after action
                            if (after_middlewares.length > 0) {
                                for (let i = 0; i < after_middlewares.length; i++) {
                                    const ret = after_middlewares[i].isAsync ? await after_middlewares[i].func(ctx) : middlewares[i].func(ctx)
                                    if (!ret) {
                                        break
                                    }
                                }
                            }
                        } catch (e) {
                            if (Route.errorHandler) {
                                void await Route.errorHandler(ctx, e)
                            } else {
                                if (isEnv("production")) {
                                    ctx.end(400, e)
                                } else {
                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                    ctx.end(400, { message: (e && e.message) || "unknown" })
                                }
                            }
                        }
                    })
                } else {
                    throw new ValidationError(ErrorMessages.invalidMethod)
                }
            })
        })
    }
}

/**
 * Decorator specifying that a controller method handles GET requests.
 *
 * @export
 * @param {string} path - The path of the request.
 * @param fncs
 * @returns The decorator.
 */
export const Get = (path: string, ...fncs: Func[]): MethodDecorator => {
    return Route.httpMethodFunction(path, "GET", fncs)
}

// noinspection JSUnusedGlobalSymbols
/**
 * Decorator specifying that a controller method handles HEAD requests.
 *
 * @export
 * @param {string} [path] - The path of the request.
 * @param fncs
 * @returns The decorator.
 */
export function Head(path: string, ...fncs: Func[]): MethodDecorator {
    return Route.httpMethodFunction(path, "HEAD", fncs)
}

// noinspection JSUnusedGlobalSymbols
/**
 * Decorator specifying that a controller method handles OPTIONS requests.
 *
 * @export
 * @param {string} [path] - The path of the request.
 * @param fncs
 * @returns The decorator.
 */
export function Options(path: string, ...fncs: Func[]): MethodDecorator {
    return Route.httpMethodFunction(path, "OPTIONS", fncs)
}

/**
 * Decorator specifying that a controller method handles POST requests.
 *
 * @export
 * @param {string} [path] - The path of the request.
 * @param fncs
 * @returns The decorator.
 */
export function Post(path: string, ...fncs: Func[]): MethodDecorator {
    return Route.httpMethodFunction(path, "POST", fncs)
}

// noinspection JSUnusedGlobalSymbols
/**
 * Decorator specifying that a controller method handles PUT requests.
 *
 * @export
 * @param {string} [path] - The path of the request.
 * @param fncs
 * @returns The decorator.
 */
export function Put(path: string, ...fncs: Func[]): MethodDecorator {
    return Route.httpMethodFunction(path, "PUT", fncs)
}

/**
 * Decorator specifying that a controller method handles PATCH requests.
 *
 * @export
 * @param {string} [path] - The path of the request.
 * @param fncs
 * @returns The decorator.
 */
export function Patch(path: string, ...fncs: Func[]): MethodDecorator {
    return Route.httpMethodFunction(path, "PATCH", fncs)
}

/**
 * Decorator specifying that a controller method handles DELETE requests.
 *
 * @export
 * @param {string} [path] - The path of the request.
 * @param fncs
 * @returns The decorator.
 */
export function Delete(path: string, ...fncs: Func[]): MethodDecorator {
    return Route.httpMethodFunction(path, "DEL", fncs)
}

export function registerMiddleware(methodName: string, method: string, func: FuncErr | Func): void {
    if (func as FuncErr) {
        Route.errorHandler = func as FuncErr
    } else {
        Route.middlewares.push(new Middleware(methodName, method, func as Func))
    }
}
