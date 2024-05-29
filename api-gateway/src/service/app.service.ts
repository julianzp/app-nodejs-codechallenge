import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTransactionEvent, getTransactionEvent } from '../types/createTransactionEvent';
import { CreateTransactionDto, GetTransactionDto } from '../types/transaction.dto';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class AppService   {
  constructor(@Inject('TRANSACTION') private readonly transactionClient: ClientKafka) {}

  async onModuleInit() {
    this.transactionClient.subscribeToResponseOf('transaction_created');
    this.transactionClient.subscribeToResponseOf('get_transaction_by_id');
  }

  async sendTransactionStatus(createTransaction: CreateTransactionDto): Promise<Observable<GetTransactionDto>> {
    const event = new CreateTransactionEvent(
      createTransaction.accountExternalIdCredit,
      createTransaction.accountExternalIdDebit,
      createTransaction.tranferTypeId,
      createTransaction.value
    ).toString();

    return this.transactionClient.send<GetTransactionDto>('transaction_created', event)
    .pipe(
        catchError(() => of(null)),
        );
    }

  async getTransactionById(transactionExternalId: string): Promise<Observable<GetTransactionDto>> {

    if (!transactionExternalId) {
      throw new Error('Transaction not found');
    }

    return this.transactionClient.send<GetTransactionDto>('get_transaction_by_id', new getTransactionEvent(transactionExternalId).toString())
      .pipe(
        catchError(() => of(null)),
      );
  }

}
