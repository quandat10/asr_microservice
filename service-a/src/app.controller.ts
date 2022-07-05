import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'main' })
  ping(_: any) {
    return of('pong').pipe(delay(1000));
  }
}
