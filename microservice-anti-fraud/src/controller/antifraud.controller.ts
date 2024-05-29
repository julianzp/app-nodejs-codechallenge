import { Controller, Get } from '@nestjs/common';
import { AntifraudService } from '../service/antifraud.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AntiFraudController {
  constructor(private readonly antifraudService: AntifraudService) {}

  @MessagePattern('get_antifraud_validation')
  getAntifraudValidation(data: any) {
    return this.antifraudService.getAntifraudValidation(data);
  }
}
