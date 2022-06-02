import { Injectable } from '@nestjs/common';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

interface GetTokenDTO {
  isPublisher: boolean;
  channel: string;
  account: string;
}

@Injectable()
export class AppService {
  private appId = '142a23cf9a0c4526b48c1c35ac9d73d6';
  private appCertificate = '4836f535aa6f41b4a45894acf3dfc073';

  generateToken(data: GetTokenDTO): any {
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const role = data.isPublisher ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

    const channel = data.channel;

    const token = RtcTokenBuilder.buildTokenWithAccount(
      this.appId,
      this.appCertificate,
      channel,
      data.account,
      role,
      privilegeExpiredTs,
    );

    return {
      rtcToken: token,
    };
  }
}
