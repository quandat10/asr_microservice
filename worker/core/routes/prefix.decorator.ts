/**
 * Set prefix for a controller
 * @param {string} prefix
 * @return {ClassDecorator}
 * @constructor
 */
export const PrefixController = (prefix: string): ClassDecorator => {
    return target => {
        Reflect.defineMetadata("prefix", prefix, target)

        console.log("prefix:", prefix, target)

        if (!Reflect.hasMetadata("routes", target)) {
            Reflect.defineMetadata("routes", [], target)
        }
    }
}
