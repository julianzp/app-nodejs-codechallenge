import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTransactionEvent, getTransactionEvent } from '../types/create-transaction.event';
import { CreateTransactionDto, GetTransactionDto, GetTransactionEvent } from '../types/transaction.dto';
import { Observable, catchError, firstValueFrom, lastValueFrom, of, tap } from 'rxjs';
import { mapTransactionEventToDto } from '../mappers/transactionMapper';

@Injectable()
export class AppService   {
  constructor(@Inject('TRANSACTION') private readonly transactionClient: ClientKafka) {}

  async onModuleInit() {
    this.transactionClient.subscribeToResponseOf('transaction_created');
    this.transactionClient.subscribeToResponseOf('get_transaction_by_id');
  }


  async sendTransactionStatus(createTransaction: CreateTransactionDto): Promise<any> {
    const event = new CreateTransactionEvent(
      createTransaction.accountExternalIdCredit,
      createTransaction.accountExternalIdDebit,
      createTransaction.tranferTypeId,
      createTransaction.value
    ).toString();

    return this.transactionClient.send('transaction_created', event);
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
