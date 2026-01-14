import { Injectable } from '@nestjs/common';
//In Services all the biz logic is written and it is used to handle data processing and communication with databases or other services.
@Injectable() //Decorator that marks a class as a provider in NestJS
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
