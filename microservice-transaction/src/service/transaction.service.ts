import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionEvent } from '../create-transaction.event';
import { ClientKafka } from '@nestjs/microservices';
import { GetAntifraudValidation } from '../types/dto/get-antifraud-validation.dto';
import { STATUS } from '../types/enum/status.enum';
import { TransactionRepository } from 'src/repository/transaction.repository';
import { mapEventToDto } from 'src/mappers/transaction.mapper';
import { lastValueFrom } from 'rxjs';



@Injectable()
export class TransactionService {

  constructor(
    private readonly transactionRepository: TransactionRepository,
    @Inject('ANTIFRAUD') private readonly antifraudClient: ClientKafka,
  ) {}


  //Event handler, it manages the event with an specific pattern and saves transaction into DB
    async handleTransactionCreated(createdTransaction: CreateTransactionEvent) {

        const transactioncreated = await this.transactionRepository.createTransaction(mapEventToDto(createdTransaction));

        // send validation to antifraud service and save its value
        const validation = await lastValueFrom(
            this.antifraudClient.send('get_antifraud_validation', new GetAntifraudValidation(createdTransaction.value, STATUS.Pending).toString())
        );

        console.log(`Antifraud service has validated the transaction with status: ${validation}`);

        await this.transactionRepository.updateTransaction({ id: transactioncreated.id, status: validation });
        
    }
}
