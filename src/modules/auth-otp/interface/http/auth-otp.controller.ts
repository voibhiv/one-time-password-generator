import { Body, Controller, Post } from '@nestjs/common';
import { CreateOtpUseCase } from 'src/modules/auth-otp/application/use-cases/create-otp.usecase';
import { OtpInput } from 'src/modules/auth-otp/application/dto/input/otp.input';
import { OtpOutput } from 'src/modules/auth-otp/application/dto/output/otp.output';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('OTP')
@Controller('auth-otp')
export class AuthOtpController {
  constructor(private readonly createOtpUseCase: CreateOtpUseCase) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new OTP' })
  @ApiBody({ type: OtpInput })
  @ApiResponse({ status: 201, description: 'OTP created', type: OtpOutput })
  async createOtp(@Body() body: OtpInput): Promise<OtpOutput> {
    const otpOutput = await this.createOtpUseCase.execute(body);
    return otpOutput;
  }
}
