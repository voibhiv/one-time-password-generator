import { IsInt, IsOptional, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpInput {
  @ApiProperty({
    example: 60,
    description: 'OTP time to live in seconds (max 60 seconds)',
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Max(60)
  timeToLive: number = 60;
}
