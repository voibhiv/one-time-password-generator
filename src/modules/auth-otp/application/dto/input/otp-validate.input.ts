import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OtpValidateInput {
  @ApiProperty({
    example: '123456',
    description: 'OTP code to be validated',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
