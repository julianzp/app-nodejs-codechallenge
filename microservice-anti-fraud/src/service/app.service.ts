import { Injectable } from '@nestjs/common';
import { GetAntifraudValidation } from '../types/dto/get-antifraud-validation.dto';
import { STATUS } from '../types/enum/status.enum';


@Injectable()
export class AppService {
  getAntifraudValidation(getAntifraudValidation: GetAntifraudValidation) {
    return (getAntifraudValidation.value <= 1000) ? STATUS.Approved : STATUS.Rejected;
  }
}
