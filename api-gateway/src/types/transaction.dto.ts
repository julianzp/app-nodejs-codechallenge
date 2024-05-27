export class CreateTransactionDto {

   accountExternalIdDebit: string;
   accountExternalIdCredit: string;
   tranferTypeId: number;
   value: number;
}

export class GetTransactionDto {

   transactionExternalId: string;
   transactionType:  {
     name: string
   }
   transactionStatus: {
      name: string
    }
   value: number;
   createdAt: Date;
}