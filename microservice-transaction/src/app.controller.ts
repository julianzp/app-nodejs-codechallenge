import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit{
  constructor(private readonly appService: AppService, @Inject('ANTIFRAUD') private readonly antifraudClient: ClientKafka,) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @EventPattern('transaction_created')
  handleTransactionCreated(data: any){
		this.appService.handleTransactionCreated(data);
  }

  onModuleInit() {
    this.antifraudClient.subscribeToResponseOf('get_antifraud_validation');
  }
}
