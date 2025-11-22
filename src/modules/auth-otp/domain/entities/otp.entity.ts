export class OtpEntity {
  id: string;
  code: string;
  timeToLive: number;
  expiredAt: Date;

  constructor(partial: Partial<OtpEntity>) {
    Object.assign(this, partial);
  }
}
