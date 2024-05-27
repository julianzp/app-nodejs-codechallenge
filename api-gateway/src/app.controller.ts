import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTransactionDto } from './types/transaction.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  sendTransactionStatus(@Body() createTransaction: CreateTransactionDto){
    this.appService.sendTransactionStatus(createTransaction);
  }


}
