import {
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  CreateTransactionEvent,
  getTransactionEvent,
} from '../types/createTransaction.event';
import {
  CreateTransactionDto,
  GetTransactionDto,
} from '../types/transaction.dto';
import { Observable, catchError, of, throwError } from 'rxjs';

const clientKafka = 'TRANSACTION';
@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject(clientKafka) private readonly transactionClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.transactionClient.subscribeToResponseOf('transaction_created');
    this.transactionClient.subscribeToResponseOf('get_transaction_by_id');
  }

  async sendTransactionStatus(
    createTransaction: CreateTransactionDto
  ): Promise<Observable<GetTransactionDto>> {
    //Validate if there is no any of the fields required to create the transaction
    const validationError =
      this.validateCreateTransactionDto(createTransaction);
    if (validationError) {
      return throwError(() => new BadRequestException(validationError));
    }

    const event = new CreateTransactionEvent(
      createTransaction.accountExternalIdCredit,
      createTransaction.accountExternalIdDebit,
      createTransaction.tranferTypeId,
      createTransaction.value
    ).toString();

    // Send the event with the transaction information
    return this.transactionClient
      .send<GetTransactionDto>('transaction_created', event)
      .pipe(catchError(() => of(null)));
  }

  async getTransactionById(
    transactionExternalId: string
  ): Promise<Observable<GetTransactionDto>> {
    if (!transactionExternalId) {
      throw new Error('Transaction not found');
    }

    return this.transactionClient
      .send<GetTransactionDto>(
        'get_transaction_by_id',
        new getTransactionEvent(transactionExternalId).toString()
      )
      .pipe(catchError(() => of(null)));
  }

  private validateCreateTransactionDto(
    dto: CreateTransactionDto
  ): string | null {
    if (!dto.accountExternalIdDebit) {
      return 'accountExternalIdDebit is required';
    }
    if (!dto.accountExternalIdCredit) {
      return 'accountExternalIdCredit is required';
    }
    if (dto.tranferTypeId == null) {
      return 'tranferTypeId is required';
    }
    if (dto.value == null) {
      return 'value is required';
    }
    return null;
  }
}
