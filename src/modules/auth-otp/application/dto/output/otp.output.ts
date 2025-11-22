import { OtpEntity } from 'src/modules/auth-otp/domain/entities/otp.entity';
import { ApiProperty } from '@nestjs/swagger';

export class OtpOutput {
  @ApiProperty({
    example: '64a1f8b6f1c2a9e1d2a3b4c5',
    description: 'OTP unique identifier',
  })
  id: string;

  @ApiProperty({ example: '123456', description: 'OTP code' })
  code: string;

  @ApiProperty({ example: 60, description: 'OTP time to live in seconds' })
  timeToLive: number;

  @ApiProperty({
    example: '2025-11-22T12:00:00.000Z',
    description: 'Expiration date in UTC',
  })
  expiredAt: Date;

  constructor(entity: OtpEntity) {
    this.code = entity.code;
    this.id = entity.id;
    this.timeToLive = entity.timeToLive;
    this.expiredAt = entity.expiredAt;
  }
}
