import { STATUS } from "../enum/status.enum";

export class GetAntifraudValidation {
 constructor(public readonly value: number, public readonly status: STATUS) {}

  toString() {
    return JSON.stringify({
      value: this.value,
      status: this.status,
    });
  }
}