import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TransactionService } from '../service/transaction.service';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class TransactionController implements OnModuleInit {
  constructor(
    private readonly transactionService: TransactionService,
    @Inject('ANTIFRAUD') private readonly antifraudClient: ClientKafka
  ) {}
  onModuleInit() {
    this.antifraudClient.subscribeToResponseOf('get_antifraud_validation');
  }

  @MessagePattern('transaction_created')
  createTransaction(data: any) {
    this.transactionService.createTransaction(data);
  }

  @MessagePattern('get_transaction_by_id')
  findTransactionById(@Payload('id') id: string) {
    return this.transactionService.getById(id);
  }
}
