export class Exchange {
    name: string
    type: string
    durable: boolean

    constructor(name: string, type: string, durable: boolean) {
        this.name = name
        this.type = type
        this.durable = durable
    }
}
