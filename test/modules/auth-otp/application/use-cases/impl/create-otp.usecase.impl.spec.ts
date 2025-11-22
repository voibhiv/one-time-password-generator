import { OtpInput } from 'src/modules/auth-otp/application/dto/input/otp.input';
import { CreateOtpUseCaseImpl } from 'src/modules/auth-otp/application/use-cases/impl/create-otp.usecase.impl';
import { OtpEntity } from 'src/modules/auth-otp/domain/entities/otp.entity';
import { OtpRepository } from 'src/modules/auth-otp/domain/repositories/otp.repository';
import { OtpCollisionException } from 'src/shared/exceptions/auth-otp/otp-collision.exception';

describe('CreateOtpUseCaseImpl', () => {
  let useCase: CreateOtpUseCaseImpl;
  let otpRepository: jest.Mocked<OtpRepository>;
  const mockId = '64a1f8b6f1c2a9e1d2a3b4c5';

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    otpRepository = {
      findOtpByCode: jest.fn(),
      createOtp: jest.fn(),
    } as any;
    useCase = new CreateOtpUseCaseImpl(otpRepository);
  });

  it('should create OTP successfully', async () => {
    otpRepository.findOtpByCode.mockResolvedValue(null);
    otpRepository.createOtp.mockImplementation((entity: OtpEntity) =>
      Promise.resolve({
        ...entity,
        id: mockId,
      }),
    );

    const input: OtpInput = { timeToLive: 30 };
    const result = await useCase.execute(input);

    expect(result).toHaveProperty('id', mockId);
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('timeToLive', 30);
    expect(result).toHaveProperty('expiredAt');
    expect(typeof result.code).toBe('string');
    expect(result.expiredAt instanceof Date).toBe(true);
    expect(result.expiredAt.getTime()).toBeGreaterThan(Date.now());
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(otpRepository.createOtp).toHaveBeenCalled();
  });

  it('should throw OtpCollisionException if code exists', async () => {
    otpRepository.findOtpByCode.mockResolvedValue({
      id: 'conflict-id',
      code: '123456',
      timeToLive: 30,
      expiredAt: new Date(Date.now() + 30000),
    });
    const input: OtpInput = { timeToLive: 30 };
    await expect(useCase.execute(input)).rejects.toThrow(OtpCollisionException);
  });

  it('should generate code with 6 digits', async () => {
    otpRepository.findOtpByCode.mockResolvedValue(null);
    otpRepository.createOtp.mockImplementation((entity: OtpEntity) =>
      Promise.resolve({
        ...entity,
        id: mockId,
      }),
    );
    const input: OtpInput = { timeToLive: 30 };
    const result = await useCase.execute(input);
    expect(result.code).toMatch(/^\d{6}$/);
  });
});
