import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/shared/exceptions/app.exception';

export class OtpNotValidException extends AppException {
  constructor() {
    super(`OTP Code doesn't exists`, HttpStatus.NOT_FOUND);
  }
}
