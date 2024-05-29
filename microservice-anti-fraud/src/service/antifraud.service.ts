import { Injectable } from '@nestjs/common';
import { GetAntifraudValidation } from '../types/dto/getAntifraudValidation.dto';
import { STATUS } from '../types/enum/status.enum';
const MAX_VALUE = 1000;

@Injectable()
export class AntifraudService {
  getAntifraudValidation(getAntifraudValidation: GetAntifraudValidation) {
    return getAntifraudValidation.value <= MAX_VALUE
      ? STATUS.Approved
      : STATUS.Rejected;
  }
}
