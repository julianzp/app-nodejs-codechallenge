export class GetAntifraudValidation {
  constructor(
    public readonly value: number,
    public readonly status: string
  ) {}

  toString() {
    return JSON.stringify({
      value: this.value,
      status: this.status,
    });
  }
}
