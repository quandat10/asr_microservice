import { BaseEntity } from "./base.entity"

export class State extends BaseEntity {
    role: string
    userId: number
    apiKey: string

    /**
     * User Constructor
     *
     * @param {any} params
     */
    constructor(params?: Record<string, unknown>) {
        super()
        if (params) {
            this.setAttributes(params)
        }
    }
}
