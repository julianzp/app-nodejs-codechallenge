import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit{
  constructor(private readonly transactionService: TransactionService, @Inject('ANTIFRAUD') private readonly antifraudClient: ClientKafka,) {}


  @EventPattern('transaction_created')
  handleTransactionCreated(data: any){
		this.transactionService.handleTransactionCreated(data);
  }

  onModuleInit() {
    this.antifraudClient.subscribeToResponseOf('get_antifraud_validation');
  }
}
