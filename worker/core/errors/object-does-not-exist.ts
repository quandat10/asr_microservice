/**
 * Represent an object that was expected to be found but that does not exist.
 *
 * @export
 * @class ObjectDoesNotExist
 * @extends {Error}
 */
export class ObjectDoesNotExist extends Error {
    readonly isObjectDoesNotExist = true

    constructor(message?: string) {
        super(message) // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    }
}

/**
 * Check if an error is an instance of ObjectDoesNotExist.
 *
 * This function is a help when you have several packages using @foal/core.
 * Npm can install the package several times, which leads to duplicate class
 * definitions. If this is the case, the keyword `instanceof` may return false
 * while the object is an instance of the class. This function fixes this
 * problem.
 *
 * @export
 * @param {object} err - The error to check.
 * @returns {err is ObjectDoesNotExist} True if the error is an instance of ObjectDoesNotExist. False otherwise.
 */
export function isObjectDoesNotExist(err: Record<string, unknown>): boolean {
    return err instanceof ObjectDoesNotExist || err.isObjectDoesNotExist === true
}
