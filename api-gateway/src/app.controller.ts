import { Response } from 'express';
import Request from 'fastify';
import { RealIP } from 'nestjs-real-ip';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  All,
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('/main/*')
  pingServiceMain(
    @Res({ passthrough: true }) res: Response,
    @Req() request: Request,
    @RealIP() ip: string
    ) {
    res.set('x-course-user-id', "hello" || '');
    res.status(HttpStatus.OK);
    return this.appService.pingServiceMain();
  }

  @All('/auth/*')
  pingServiceAuth() {
    return this.appService.pingServiceAuth();
  }

  @Get('/ping-all')
  pingAll() {
    return zip(
      this.appService.pingServiceMain(),
      this.appService.pingServiceAuth(),
    ).pipe(
      map(([serviceMain, serviceAuth]) => ({
        serviceMain,
        serviceAuth,
      })),
    );
  }
}
