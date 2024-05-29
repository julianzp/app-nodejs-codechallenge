import { Injectable } from "@nestjs/common";
import { Transaction } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTransactionDto } from "src/types/dto/createTransaction.dto";
import { UpdateTransactionDto } from "src/types/dto/updateTransaction.dto";


@Injectable()
export class TransactionRepository {

    constructor(private prisma: PrismaService) {}

     createTransaction(createTransaction: CreateTransactionDto){
       return this.prisma.transaction.create({ data: createTransaction });
    }

    updateTransaction(updateTransaction: UpdateTransactionDto){
      return this.prisma.transaction.update({
        where: {id: updateTransaction.id},
        data: {status: updateTransaction.status, updatedAt: new Date()}
        });
    }

    getById(id: string): Promise<Transaction | null> {

        const record = this.prisma.transaction.findFirst({
        where: {  id },
        include: { transactionType: true },
        });
        return record;
    }

}