import {
  Controller,
  Get,
  UseGuards,
} from "@nestjs/common";

import { AppService } from "./app.service";
import { MessageComponent } from "./components/message.component";
import { RolesGuard } from "./validators/roles.guard";

@Controller()
@UseGuards(RolesGuard)
export class AppController {
    constructor(
        private readonly appService: AppService,
        private i18n: MessageComponent
    ) { }

    @Get("healthz")
    selfCheck(): unknown {
        return { message: "Request Succeed!" };
    }
}


