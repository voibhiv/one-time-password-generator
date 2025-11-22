import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, expireAfterSeconds: 60 })
export class OtpDocument {
  @Prop()
  id: string;

  @Prop()
  code: string;

  @Prop()
  timeToLive: number;

  @Prop({ type: Date, required: true })
  expiredAt: Date;
}

export type OtpMongoDocument = HydratedDocument<OtpDocument>;
export const OtpMongoSchema = SchemaFactory.createForClass(OtpDocument);

OtpMongoSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });
