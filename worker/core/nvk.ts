import "reflect-metadata"

import { App, RecognizedString, TemplatedApp, us_listen_socket } from "uWebSockets.js"
import Route from "./route"

export default class NVK {
    private readonly app: TemplatedApp
    private token: us_listen_socket = null
    private configs;

    route: Route = new Route()

    /**
     * Contructor function
     */
    constructor(options = {}) {
        this.configs = options

        this.app = App()

    }

    /**
     * @param {any} controllers
     */
    initRoute(controllers: unknown[]): void {
        Route.routesReflect(this.app, controllers)
    }

    /**
     * @param host
     * @param {integer} port
     * @param {Function} fnc
     */
    listen(host: RecognizedString = "0.0.0.0", port: number, fnc: (params?: Record<string, unknown>) => void): void {

        this.app.listen(host, port, token => {
            this.onListenHandler(token)
            fnc()
        })
    }

    async close(): Promise<boolean> {
        setTimeout(() => {
            console.log("Shutting down now")
            // us_listen_socket_close(this.token)
            this.token = null
        }, 500)

        return true
    }

    protected onListenHandler(token: us_listen_socket): void {
        if (token) {
            this.token = token
        } else {
            console.log("Can not start server")
        }
    }
}
