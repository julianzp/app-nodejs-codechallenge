import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionEvent } from './create-transaction.event';
import { ClientKafka } from '@nestjs/microservices';
import { GetAntifraudValidation } from './types/dto/get-antifraud-validation.dto';
import { STATUS } from './types/enum/status.enum';


@Injectable()
export class AppService {

  constructor(
    @Inject('ANTIFRAUD') private readonly antifraudClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  //Event handler, it manages the event with an specific pattern
  // Here is where we can save the transaction in a DB
   handleTransactionCreated(createdTransaction: CreateTransactionEvent) {

        console.log('LLEGO AL HANDLER SERVICE', createdTransaction);
        this.antifraudClient
      .send('get_antifraud_validation', new GetAntifraudValidation(createdTransaction.value, STATUS.Pending).toString())
      .subscribe((validation) => {
        console.log(
          `Antifraud service has validated the transaction with status: ${validation}`,
        );
      });
  }
}
