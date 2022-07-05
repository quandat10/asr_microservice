import {
  Controller,
  Get,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'auth' })
  @Get("hello")
  async getHello(){
    return {data:"hello world"}
  }
}
