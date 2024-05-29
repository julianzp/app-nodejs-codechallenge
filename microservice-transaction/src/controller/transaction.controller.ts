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
import { CreateTransactionDto } from 'src/types/dto/createTransaction.dto';
import { CreateTransactionEvent } from 'src/types/dto/createTransaction.event';

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
  createTransaction(createTransaction: CreateTransactionEvent) {
    this.transactionService.createTransaction(createTransaction);
  }

  @MessagePattern('get_transaction_by_id')
  findTransactionById(@Payload('id') id: string) {
    return this.transactionService.getById(id);
  }
}
