import { map } from 'rxjs/operators';

import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_MAIN') private readonly clientServiceMain: ClientProxy,
    @Inject('SERVICE_AUTH') private readonly clientServiceAuth: ClientProxy,
  ) {}

  pingServiceMain() {
    const startTs = Date.now();
    const pattern = { cmd: 'main' };
    const payload = {};
    return this.clientServiceMain
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  pingServiceAuth() {
    const startTs = Date.now();
    const pattern = { cmd: 'auth' };
    const payload = {};
    return this.clientServiceAuth
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }
}
