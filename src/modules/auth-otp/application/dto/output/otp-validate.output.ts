import { ApiProperty } from '@nestjs/swagger';

export class OtpValidateOutput {
  @ApiProperty({
    example: 'OTP is valid',
    description: 'Validation result message',
  })
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
