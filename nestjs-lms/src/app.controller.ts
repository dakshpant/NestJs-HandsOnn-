import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//Controller is only used to handle incoming requests and return responses to the client.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} //dependency injection of APPService => {(private readonly appService: AppService)}

  @Get() //GET decorator to handle HTTP GET requests {/api/products}
  getHello(): string {
    return this.appService.getHello();
  }
}
