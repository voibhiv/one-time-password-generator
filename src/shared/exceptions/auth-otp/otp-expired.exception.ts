import { AppException } from '../app.exception';
import { HttpStatus } from '@nestjs/common';

export class OtpExpiredException extends AppException {
  constructor() {
    super('OTP Expired', HttpStatus.GONE);
  }
}
