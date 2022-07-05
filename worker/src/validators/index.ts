import Validator, { ValidationSchema } from "fastest-validator"

// import { EnvType } from "@/enums/app_enum"
import { ValidationError } from "@/exceptions"

export function validate(schema: ValidationSchema, data: Record<string, unknown>): void {
    const validator = new Validator()
    const check = validator.compile(schema)

    const result = check(data)

    if (result !== true) {

        const errorMessage = result.map(e => `${e.type}:${e.message}`).join(",")

        throw new ValidationError(
            // isEnv(EnvType.PRODUCTION) ? ErrorMessages.VALIDATION_INPUT_TYPE_ERROR : errorMessage,
            errorMessage,
            result as unknown as Record<string, unknown>,
            400,
            900
        )
    }

    return
}
