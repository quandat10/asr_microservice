export abstract class BaseDto {

    /**
    * BaseModel Constructor
    *
    * @param {any} params
    */
    constructor(params?: Record<string, unknown>) {
        if (params) {
            this.setAttributes(params)
        }
    }

    /**
    * @param params
    */
    setAttributes(params: Record<string, unknown>): void {
        const keys = Object.keys(params)

        for (const key of keys) {
            this.setAttribute(key, params[key])
        }
    }

    /**
    * @param {string} name
    */
    hasProperty(name: string): boolean {
        return true === Reflect.getMetadata("fields", this, name)
    }

    /**
    * Set a attribute
    *
    * @param {string} key
    * @param {unknown} value
    */
    setAttribute(key: string, value: unknown): void {
        if (this.hasProperty(key)) {
            this[key] = value
        } else {
            // throw new Error("Property:" + key + " not exist")
        }
    }
}