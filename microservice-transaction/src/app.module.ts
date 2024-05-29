import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { TransactionService } from './service/transaction.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionRepository } from './repository/transaction.repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ANTIFRAUD',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'antifraud',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'antifraud-consumer',
          },
        },
      },
    ]),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [TransactionService, TransactionRepository],

})
export class AppModule {}
