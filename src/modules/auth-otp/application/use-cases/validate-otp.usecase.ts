import { OtpValidateInput } from 'src/modules/auth-otp/application/dto/input/otp-validate.input';
import { OtpValidateOutput } from 'src/modules/auth-otp/application/dto/output/otp-validate.output';
import { OtpEntity } from 'src/modules/auth-otp/domain/entities/otp.entity';

export abstract class ValidateOtpUseCase {
  abstract execute(input: OtpValidateInput): Promise<OtpValidateOutput>;
  protected abstract validatorOtpValidate(otp: OtpEntity | null): void;
}
