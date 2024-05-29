import { Body, Controller, Get, Inject, OnModuleInit, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { CreateTransactionDto } from '../types/transaction.dto';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';


@Controller()
export class AppController implements OnModuleInit{
  constructor(private readonly appService: AppService, @Inject('TRANSACTION') private readonly transactionClient: ClientKafka) {}
    async onModuleInit() {
    this.transactionClient.subscribeToResponseOf('transaction_created');
    }

  @Post('create')
  async sendTransactionStatus(@Body() createTransaction: CreateTransactionDto): Promise<Observable<unknown>> {
    return this.appService.sendTransactionStatus(createTransaction);
  }

  @Get(':id')
   getTransaction(@Param('id', ParseUUIDPipe) transactionExternalId: string) {
    return this.appService.getTransactionById(transactionExternalId);
  }

}
