import { HttpCodeEnum } from "#/enums/core_enum"
import { HttpRequest, HttpResponse } from "uWebSockets.js"
import { HttpCode } from "#/constants/http-code"
import { State } from "./state.entity"

export { HttpRequest, HttpResponse }

// tslint:disable-next-line:interface-name
export interface ContextInterface {
    path: string
    header: Map<string, string>
    params: Record<string, unknown>
    arguments: Map<number, unknown>
    body: Record<string, unknown>
    cookies: Record<string, unknown>
    request: HttpRequest
    response: HttpResponse
}

export default class Context implements ContextInterface {
    path: string
    header: Map<string, string>
    params: Record<string, unknown>
    arguments: Map<number, unknown>
    body: Record<string, unknown>
    cookies: Record<string, unknown>
    request: HttpRequest
    response: HttpResponse
    state: State

    /**
     * @param request
     * @param response
     */
    constructor(
        request: HttpRequest,
        response: HttpResponse
    ) {
        const ip_binary = response.getRemoteAddress()
        const header = new Map<string, string>()
        header.set("remote_ip", new Uint8Array(ip_binary).join("."))

        this.request = request
        this.response = response
        this.path = ""
        this.header = header
        this.params = {}
        this.arguments = new Map<number, unknown>()
        this.body = {}
        this.cookies = {}
        this.state = new State()
    }

    end(httpStatus: number, body: Record<string, unknown>): void {
        if (!this.response.aborted) {
            this.response.writeStatus(HttpCode[HttpCodeEnum[httpStatus]]).writeHeader("Content-Type", "text/json")
            this.response.end(JSON.stringify(body))
        } else {
            //
        }
    }
}
