import { Decimal } from '@prisma/client/runtime/library';

export type InputTransactionType = {
  id: string;
  status: string;
  value: number;
  transactionType: TransactionType;
  createdAt: Date;
};

type TransactionType = {
  name: string;
};

export class CreateTransactionEvent {
  constructor(
    public readonly accountExternalIdDebit: string,
    public readonly accountExternalIdCredit: string,
    public readonly tranferTypeId: number,
    public readonly value: number
  ) {}
}
