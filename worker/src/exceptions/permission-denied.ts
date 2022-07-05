import { BaseError } from "./base-error"

/**
 * Represent the prohibition to perform an action that was expected to be accessible.
 *
 * @export
 * @class PermissionDenied
 * @extends {Error}
 */
export class PermissionDenied extends BaseError {
}
