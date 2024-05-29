import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_antifraud_validation')
  getAntifraudValidation(data: any) {
    return this.appService.getAntifraudValidation(data);
  }

}
