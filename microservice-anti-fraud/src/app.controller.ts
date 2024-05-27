import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_antifraud_validation')
  getUser(data: any) {
    return this.appService.getAntifraudValidation(data);
  }
}
