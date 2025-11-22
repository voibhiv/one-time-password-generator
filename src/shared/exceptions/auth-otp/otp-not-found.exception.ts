import { AppException } from '../app.exception';
import { HttpStatus } from '@nestjs/common';

export class OtpNotFoundException extends AppException {
  constructor() {
    super('OTP Not Founded', HttpStatus.NOT_FOUND);
  }
}
