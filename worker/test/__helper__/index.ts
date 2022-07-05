import { HttpRequest, HttpResponse } from "#/entites/context"
import { RecognizedString, us_socket_context_t } from "uWebSockets.js"

class HttpResponseMock implements HttpResponse {
    [key: string]: any
    constructor() {
        this.buffer = ''
        this.headers = {}
    }
    writeStatus(status: RecognizedString): HttpResponse {
        this.code = status

        return this
    }
    writeHeader(key: string, value: RecognizedString): HttpResponse {
        this.headers[key] = value

        return this
    }
    write(chunk: RecognizedString): HttpResponse {
        throw new Error("Method not implemented.")
    }
    end(body?: RecognizedString): HttpResponse {
        this.buffer = body

        return this
    }
    tryEnd(fullBodyOrChunk: RecognizedString, totalSize: number): [boolean, boolean] {
        throw new Error("Method not implemented.")
    }
    close(): HttpResponse {

        return this
    }
    getWriteOffset(): number {
        throw new Error("Method not implemented.")
    }
    onWritable(handler: (offset: number) => boolean): HttpResponse {
        throw new Error("Method not implemented.")
    }
    onAborted(handler: () => void): HttpResponse {
        throw new Error("Method not implemented.")
    }
    onData(handler: (chunk: ArrayBuffer, isLast: boolean) => void): HttpResponse {
        throw new Error("Method not implemented.")
    }
    getRemoteAddress(): ArrayBuffer {
        const ipBuffer = new Uint8Array(4)

        ipBuffer[0] = 127
        ipBuffer[3] = 1

        return ipBuffer
    }
    getRemoteAddressAsText(): ArrayBuffer {
        throw new Error("Method not implemented.")
    }
    getProxiedRemoteAddress(): ArrayBuffer {
        throw new Error("Method not implemented.")
    }
    getProxiedRemoteAddressAsText(): ArrayBuffer {
        throw new Error("Method not implemented.")
    }
    cork(cb: () => void): void {
        throw new Error("Method not implemented.")
    }
    upgrade<T>(userData: T, secWebSocketKey: RecognizedString, secWebSocketProtocol: RecognizedString, secWebSocketExtensions: RecognizedString, context: us_socket_context_t): void {
        throw new Error("Method not implemented.")
    }

}

export const request: HttpRequest = {} as HttpRequest
export const response: HttpResponse = new HttpResponseMock()
