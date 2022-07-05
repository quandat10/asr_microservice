import { Property } from "src/utils/general.util";

import {
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

import { BaseDto } from "../base/base.dto";

class Obj { }

export class TokenDto extends BaseDto<Obj> {
    @Property()
    userId: number;

    @Property()
    role: string;

    @Property()
    userCode: string;

    @Property()
    lang: string;

    @Property()
    apiKey: string;
}

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const headers = request.headers as unknown as Record<string, unknown>

        return new TokenDto({
            userId: headers["x-asr-user-id"] ? parseInt(headers["x-asr-user-id"] as string) : 0,
            userCode: headers["x-asr-user-code"] || "",
            role: headers["x-asr-role"] || "",
            lang: headers["x-asr-lang"] || "vi",
            apiKey: headers["x-asr-api-key"] || "",
        });
    },
);