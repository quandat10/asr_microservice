
/**
 * HTTP methods available.
 */
export type HttpMethod = "POST" | "GET" | "PUT" | "PATCH" | "DEL" | "HEAD" | "OPTIONS"

/**
 * Route interface
 */
export interface IRouteDefinition {
    // Path to our route
    path: string
    // HTTP Request method (get, post, ...)
    requestMethod: HttpMethod
    // Method name within our class responsible for this route
    methodName: string
}
