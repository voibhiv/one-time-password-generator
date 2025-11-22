import { OtpEntity } from 'src/modules/auth-otp/domain/entities/otp.entity';

export abstract class OtpRepository {
  abstract createOtp(otpEtity: OtpEntity): Promise<OtpEntity>;
  abstract findOtpByCode(code: string): Promise<OtpEntity | null>;
  abstract findOtpByCodeAndDelete(code: string): Promise<OtpEntity | null>;
  abstract deleteOtp(phone: string): Promise<void>;
}
