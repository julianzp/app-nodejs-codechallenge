export class CreateTransactionEvent {
  constructor(
    public readonly accountExternalIdDebit: string,
    public readonly accountExternalIdCredit: string,
    public readonly tranferTypeId: number,
    public readonly value: number
  ) {}

  toString() {
    return JSON.stringify({
      accountExternalIdDebit: this.accountExternalIdDebit,
      accountExternalIdCredit: this.accountExternalIdCredit,
      tranferTypeId: this.tranferTypeId,
      value: this.value,
    });
  }
}

export class getTransactionEvent {
  constructor(public readonly id: string) {}

  toString() {
    return JSON.stringify({
      id: this.id,
    });
  }
}
