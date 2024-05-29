import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionEvent } from '../types/dto/createTransaction.event';
import { ClientKafka } from '@nestjs/microservices';
import { GetAntifraudValidation } from '../types/dto/getAntifraudValidation.dto';
import { STATUS } from '../types/enum/status.enum';
import { TransactionRepository } from 'src/repository/transaction.repository';
import {
  mapEventToDto,
  transactionMapper,
} from 'src/mappers/transaction.mapper';
import { catchError, from, lastValueFrom, map, throwError } from 'rxjs';
import { CreateTransactionDto } from 'src/types/dto/createTransaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    @Inject('ANTIFRAUD') private readonly antifraudClient: ClientKafka
  ) {}

  //Event handler, it manages the event with an specific pattern and saves transaction into DB
  async createTransaction(
    createdTransaction: CreateTransactionEvent
  ): Promise<CreateTransactionDto> {
    const transactioncreated =
      await this.transactionRepository.createTransaction(
        mapEventToDto(createdTransaction)
      );

    // send validation to antifraud service and save its value
    const validation = await lastValueFrom(
      this.antifraudClient.send(
        'get_antifraud_validation',
        new GetAntifraudValidation(
          createdTransaction.value,
          STATUS.Pending
        ).toString()
      )
    );

    console.log(
      `Antifraud service has validated the transaction with status: ${validation}`
    );

    // Update transaction's status
    return await this.transactionRepository.updateTransaction({
      id: transactioncreated.id,
      status: validation,
    });
  }

  getById(id: string) {
    return from(this.transactionRepository.getById(id)).pipe(
      map((transaction) => {
        if (!transaction) {
          throw new NotFoundException(
            `The transaction could not be found with id: ${id}}`
          );
        }
        return JSON.stringify(transactionMapper(transaction as any));
      }),
      catchError((e) => {
        throw throwError(() => e);
      })
    );
  }
}
