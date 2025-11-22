import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpInput {
  @ApiProperty({
    example: 60,
    description: 'OTP time to live in seconds (max 60 seconds)',
    required: true,
    minimum: 10,
    maximum: 60,
  })
  @IsInt()
  @Max(60)
  @Min(10)
  @IsNotEmpty()
  @IsNumber()
  timeToLive: number;
}
