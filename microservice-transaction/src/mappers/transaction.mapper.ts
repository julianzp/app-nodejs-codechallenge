import { CreateTransactionEvent } from "src/create-transaction.event";
import { CreateTransactionDto } from "src/types/dto/createTransaction.dto";


export function mapEventToDto(event: CreateTransactionEvent): CreateTransactionDto {
  const dto = new CreateTransactionDto();
  dto.accountExternalIdDebit = event.accountExternalIdDebit;
  dto.accountExternalIdCredit = event.accountExternalIdCredit;
  dto.transferTypeId = String(event.tranferTypeId);
  dto.value = event.value;
  return dto;
}
