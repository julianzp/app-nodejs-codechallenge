export class CreateTransactionDto {

   accountExternalIdDebit: string;
   accountExternalIdCredit: string;
   tranferTypeId: number;
   value: number;
}

export interface GetTransactionDto {

   transactionExternalId: string;
   transactionType:  {name: string}
   transactionStatus: {
      name: string
    }
   value: number;
   createdAt: Date;
}

export interface TransactionType {
    id: string,
    code?: string,
    name?: string
}

export class GetTransactionEvent {
  constructor(
    public readonly transactionExternalId: string,
    public readonly transactionType: string,
    public readonly transactionStatus: string,
    public readonly value: number,
    public readonly createdAt: Date
  ) {}

  toString() {
    return JSON.stringify({
      transactionExternalId: this.transactionExternalId,
      transactionType: this.transactionType,
      transactionStatus: this.transactionStatus,
      value: this.value,
      createdAt: this.createdAt,
    });
  }
}