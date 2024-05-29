import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiGatewayService } from '../service/apiGateway.service';
import { CreateTransactionDto } from '../types/transaction.dto';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class ApiGatewayController implements OnModuleInit {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('TRANSACTION') private readonly transactionClient: ClientKafka
  ) {}
  async onModuleInit() {
    this.transactionClient.subscribeToResponseOf('transaction_created');
    this.transactionClient.subscribeToResponseOf('get_transaction_by_id');
  }

  @Post('create')
  async sendTransactionStatus(
    @Body() createTransaction: CreateTransactionDto
  ): Promise<Observable<unknown>> {
    return this.apiGatewayService.sendTransactionStatus(createTransaction);
  }

  @Get(':id')
  getTransaction(@Param('id', ParseUUIDPipe) transactionExternalId: string) {
    return this.apiGatewayService.getTransactionById(transactionExternalId);
  }
}
