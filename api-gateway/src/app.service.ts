import { Inject, Injectable } from '@nestjs/common';;
import { ClientKafka } from '@nestjs/microservices';
import { CreateTransactionEvent } from './create-transaction.event';
import { CreateTransactionDto } from './types/transaction.dto';


@Injectable()
export class AppService {
	private readonly transactions: any[] = [];
	
	constructor(@Inject('TRANSACTION') private readonly transactionClient: ClientKafka){}
	
  getHello(): string {
    return 'Hello World!';
  }


  sendTransactionStatus(createTransaction: CreateTransactionDto){
    const event = new CreateTransactionEvent(createTransaction.accountExternalIdCredit, createTransaction.accountExternalIdDebit, createTransaction.tranferTypeId, createTransaction.value).toString();
	this.transactionClient.emit('transaction_created', event);
  }

}
