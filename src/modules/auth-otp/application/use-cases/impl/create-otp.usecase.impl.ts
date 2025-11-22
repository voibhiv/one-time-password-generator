import { Injectable } from '@nestjs/common';
import { OtpInput } from 'src/modules/auth-otp/application/dto/input/otp.input';
import { OtpOutput } from 'src/modules/auth-otp/application/dto/output/otp.output';
import { CreateOtpUseCase } from 'src/modules/auth-otp/application/use-cases/create-otp.usecase';
import { OtpEntity } from 'src/modules/auth-otp/domain/entities/otp.entity';
import { OtpRepository } from 'src/modules/auth-otp/domain/repositories/otp.repository';
import { OtpCollisionException } from 'src/shared/exceptions/auth-otp/otp-collision.exception';

@Injectable()
export class CreateOtpUseCaseImpl extends CreateOtpUseCase {
  constructor(private readonly otpRepository: OtpRepository) {
    super();
  }

  protected generateCode(): string {
    const lengthCode = 6;

    return Math.floor(Math.random() * Math.pow(10, lengthCode))
      .toString()
      .padStart(lengthCode, '0');
  }

  protected async validatorCreateOtp(code: string): Promise<void> {
    const findOtpCode = await this.otpRepository.findOtpByCode(code);
    if (findOtpCode) {
      throw new OtpCollisionException();
    }
  }

  async execute(input: OtpInput): Promise<OtpOutput> {
    const code = this.generateCode();

    await this.validatorCreateOtp(code);

    const expiredAt = new Date(Date.now() + (input.timeToLive ?? 60) * 1000);

    const otpEntity = new OtpEntity({
      code,
      timeToLive: input.timeToLive,
      expiredAt,
    });

    const createdOtp = await this.otpRepository.createOtp(otpEntity);

    return new OtpOutput(createdOtp);
  }
}
