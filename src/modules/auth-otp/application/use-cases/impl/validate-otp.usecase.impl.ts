import { Injectable } from '@nestjs/common';
import { OtpValidateInput } from 'src/modules/auth-otp/application/dto/input/otp-validate.input';
import { OtpValidateOutput } from 'src/modules/auth-otp/application/dto/output/otp-validate.output';
import { ValidateOtpUseCase } from 'src/modules/auth-otp/application/use-cases/validate-otp.usecase';
import { OtpEntity } from 'src/modules/auth-otp/domain/entities/otp.entity';
import { OtpRepository } from 'src/modules/auth-otp/domain/repositories/otp.repository';
import { OtpExpiredException } from 'src/shared/exceptions/auth-otp/otp-expired.exception';
import { OtpNotValidException } from 'src/shared/exceptions/auth-otp/otp-not-valid.exception';

@Injectable()
export class ValidateOtpUseCaseImpl extends ValidateOtpUseCase {
  constructor(private readonly otpRepository: OtpRepository) {
    super();
  }

  validatorOtpValidate(otp: OtpEntity | null): void {
    if (!otp) {
      throw new OtpNotValidException();
    }

    if (otp.expiredAt < new Date()) {
      throw new OtpExpiredException();
    }
  }

  async execute(input: OtpValidateInput): Promise<OtpValidateOutput> {
    const { code } = input;

    const otp = await this.otpRepository.findOtpByCodeAndDelete(code);

    this.validatorOtpValidate(otp);

    return new OtpValidateOutput(
      `OTP ${otp?.code} is valid and successfully verified.`,
    );
  }
}
