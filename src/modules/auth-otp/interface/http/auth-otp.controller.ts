import { Body, Controller, Post } from '@nestjs/common';
import { CreateOtpUseCase } from 'src/modules/auth-otp/application/use-cases/create-otp.usecase';
import { OtpInput } from 'src/modules/auth-otp/application/dto/input/otp.input';
import { OtpOutput } from 'src/modules/auth-otp/application/dto/output/otp.output';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateOtpUseCase } from 'src/modules/auth-otp/application/use-cases/validate-otp.usecase';
import { OtpValidateInput } from 'src/modules/auth-otp/application/dto/input/otp-validate.input';
import { OtpValidateOutput } from 'src/modules/auth-otp/application/dto/output/otp-validate.output';

@ApiTags('OTP Authentication')
@Controller('auth-otp')
export class AuthOtpController {
  constructor(
    private readonly createOtpUseCase: CreateOtpUseCase,
    private readonly validateOtpUseCase: ValidateOtpUseCase,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new OTP' })
  @ApiBody({ type: OtpInput })
  @ApiResponse({ status: 201, description: 'OTP created', type: OtpOutput })
  async createOtp(@Body() body: OtpInput): Promise<OtpOutput> {
    const otpOutput = await this.createOtpUseCase.execute(body);
    return otpOutput;
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate an OTP code' })
  @ApiBody({ type: OtpValidateInput })
  @ApiResponse({
    status: 200,
    description: 'OTP verified successfully',
    type: OtpValidateOutput,
  })
  async verifyOtp(@Body() body: OtpValidateInput): Promise<OtpValidateOutput> {
    return this.validateOtpUseCase.execute(body);
  }
}
