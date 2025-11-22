import { OtpInput } from 'src/modules/auth-otp/application/dto/input/otp.input';
import { OtpOutput } from 'src/modules/auth-otp/application/dto/output/otp.output';

export abstract class CreateOtpUseCase {
  protected abstract generateCode(): string;
  abstract execute(input: OtpInput): Promise<OtpOutput>;
}
