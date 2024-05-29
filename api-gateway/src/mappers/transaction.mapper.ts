import {
  GetTransactionDto,
  GetTransactionEvent,
} from 'src/types/transaction.dto';

export function mapTransactionEventToDto(
  event: GetTransactionEvent
): GetTransactionDto {
  return {
    transactionExternalId: event.transactionExternalId,
    transactionType: { name: event.transactionType },
    transactionStatus: { name: event.transactionStatus },
    value: event.value,
    createdAt: event.createdAt,
  };
}
