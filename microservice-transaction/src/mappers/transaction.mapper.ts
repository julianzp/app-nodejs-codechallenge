import { Transaction } from "@prisma/client";
import { CreateTransactionEvent } from "src/types/dto/create-transaction.event";
import { CreateTransactionDto } from "src/types/dto/createTransaction.dto";
import { GetTransactionDto } from "src/types/dto/transaction.dto";


export function transactionMapper(transaction: Transaction): GetTransactionDto {
        return {
            transactionExternalId: transaction.id,
            transactionType: { name: transaction.transferTypeId },
            transactionStatus: { name: transaction.status },
            value: transaction.value,
            createdAt: transaction.createdAt, 
        };
}


export function mapEventToDto(event: CreateTransactionEvent): CreateTransactionDto {
  const dto = new CreateTransactionDto();
  dto.accountExternalIdDebit = event.accountExternalIdDebit;
  dto.accountExternalIdCredit = event.accountExternalIdCredit;
  dto.transferTypeId = String(event.tranferTypeId);
  dto.value = event.value;
  return dto;
}
