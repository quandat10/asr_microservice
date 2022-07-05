import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Headers() {
    return applyDecorators(
        ApiHeader({
            name: "x-asr-user-id",
            description: "asr User Id",
        }),
        ApiHeader({
            name: "x-asr-role",
            description: "Role User",
            schema: {
                default: "user"
            }
        }),
        ApiHeader({
            name: "x-asr-user-code",
            description: "asr User Code"
        })
    );
}