import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpEntity } from 'src/modules/auth-otp/domain/entities/otp.entity';
import { OtpRepository } from 'src/modules/auth-otp/domain/repositories/otp.repository';
import {
  OtpDocument,
  OtpMongoDocument,
} from 'src/modules/auth-otp/infra/db/schemas/otp.schema';

@Injectable()
export class OtpRespositoryMongo extends OtpRepository {
  constructor(
    @InjectModel(OtpDocument.name)
    private readonly otpModel: Model<OtpMongoDocument>,
  ) {
    super();
  }

  async createOtp(otpEtity: OtpEntity): Promise<OtpEntity> {
    const createdOtp = await this.otpModel.create(otpEtity);

    return new OtpEntity({
      id: createdOtp._id.toString(),
      code: createdOtp.code,
      timeToLive: createdOtp.timeToLive,
    });
  }

  async findOtpByCode(code: string): Promise<OtpEntity | null> {
    const otp = await this.otpModel.findOne({ code }).exec();

    if (!otp) {
      return null;
    }

    return new OtpEntity({
      id: otp._id.toString(),
      code: otp.code,
      timeToLive: otp.timeToLive,
    });
  }

  async deleteOtp(code: string): Promise<void> {
    await this.otpModel.deleteOne({ code }).exec();
  }
}
