import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateOtpUseCase } from 'src/modules/auth-otp/application/use-cases/create-otp.usecase';
import { CreateOtpUseCaseImpl } from 'src/modules/auth-otp/application/use-cases/impl/create-otp.usecase.impl';
import { OtpRepository } from 'src/modules/auth-otp/domain/repositories/otp.repository';
import { OtpRespositoryMongo } from 'src/modules/auth-otp/infra/db/repositories/otp.repository.mongo';
import {
  OtpDocument,
  OtpMongoSchema,
} from 'src/modules/auth-otp/infra/db/schemas/otp.schema';
import { AuthOtpController } from 'src/modules/auth-otp/interface/http/auth-otp.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OtpDocument.name, schema: OtpMongoSchema },
    ]),
  ],
  controllers: [AuthOtpController],
  providers: [
    {
      provide: CreateOtpUseCase,
      useClass: CreateOtpUseCaseImpl,
    },
    {
      provide: OtpRepository,
      useClass: OtpRespositoryMongo,
    },
  ],
})
export class AuthOtpModule {}
