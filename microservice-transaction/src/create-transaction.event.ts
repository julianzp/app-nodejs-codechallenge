import { CreateTransactionDto } from "./types/dto/transaction.dto";


export class CreateTransactionEvent {
    constructor(public readonly accountExternalIdDebit: string,
    public readonly accountExternalIdCredit: string,
    public readonly tranferTypeId: number,
    public readonly value: number){}
}