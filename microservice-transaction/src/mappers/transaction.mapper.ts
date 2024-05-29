import {
  CreateTransactionEvent,
  InputTransactionType,
} from 'src/types/dto/createTransaction.event';
import { CreateTransactionDto } from 'src/types/dto/createTransaction.dto';

export const transactionMapper = (input: InputTransactionType) => ({
  transactionExternalId: input.id,
  transactionType: {
    name: input.transactionType.name,
  },
  transactionStatus: {
    name: input.status,
  },
  value: input.value,
  createdAt: new Date(input.createdAt),
});

export function mapEventToDto(
  event: CreateTransactionEvent
): CreateTransactionDto {
  const dto = new CreateTransactionDto();
  dto.accountExternalIdDebit = event.accountExternalIdDebit;
  dto.accountExternalIdCredit = event.accountExternalIdCredit;
  dto.transferTypeId = String(event.tranferTypeId);
  dto.value = event.value;
  return dto;
}
