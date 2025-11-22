import { AppException } from '../app.exception';
import { HttpStatus } from '@nestjs/common';

export class OtpCollisionException extends AppException {
  constructor() {
    super('OTP Code already existed', HttpStatus.CONFLICT);
  }
}
