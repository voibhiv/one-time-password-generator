import { ValidateOtpUseCaseImpl } from 'src/modules/auth-otp/application/use-cases/impl/validate-otp.usecase.impl';
import { OtpRepository } from 'src/modules/auth-otp/domain/repositories/otp.repository';
import { OtpValidateInput } from 'src/modules/auth-otp/application/dto/input/otp-validate.input';
import { OtpEntity } from 'src/modules/auth-otp/domain/entities/otp.entity';
import { OtpExpiredException } from 'src/shared/exceptions/auth-otp/otp-expired.exception';
import { OtpNotValidException } from 'src/shared/exceptions/auth-otp/otp-not-valid.exception';

describe('ValidateOtpUseCaseImpl', () => {
  let useCase: ValidateOtpUseCaseImpl;
  let otpRepository: jest.Mocked<OtpRepository>;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    otpRepository = {
      findOtpByCodeAndDelete: jest.fn(),
    } as any;
    useCase = new ValidateOtpUseCaseImpl(otpRepository);
  });

  it('should validate and return a message when OTP is valid', async () => {
    const future = new Date(Date.now() + 60000);
    const otp: OtpEntity = {
      id: '64a1f8b6f1c2a9e1d2a3b4c5',
      code: '123456',
      timeToLive: 60,
      expiredAt: future,
    };
    otpRepository.findOtpByCodeAndDelete.mockResolvedValue(otp as any);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const input: OtpValidateInput = { code: '123456' } as any;
    const result = await useCase.execute(input);

    expect(result).toHaveProperty('message');
    expect(result.message).toContain(otp.code);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(otpRepository.findOtpByCodeAndDelete).toHaveBeenCalledWith(otp.code);
  });

  it('should throw OtpNotValidException when OTP not found', async () => {
    otpRepository.findOtpByCodeAndDelete.mockResolvedValue(null);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const input: OtpValidateInput = { code: '000000' } as any;
    await expect(useCase.execute(input)).rejects.toThrow(OtpNotValidException);
  });

  it('should throw OtpExpiredException when OTP expired', async () => {
    const past = new Date(Date.now() - 60000);
    const otp: OtpEntity = {
      id: '64a1f8b6f1c2a9e1d2a3b4c5',
      code: '654321',
      timeToLive: 60,
      expiredAt: past,
    };
    otpRepository.findOtpByCodeAndDelete.mockResolvedValue(otp as any);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const input: OtpValidateInput = { code: '654321' } as any;
    await expect(useCase.execute(input)).rejects.toThrow(OtpExpiredException);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(otpRepository.findOtpByCodeAndDelete).toHaveBeenCalledWith(otp.code);
  });
});
