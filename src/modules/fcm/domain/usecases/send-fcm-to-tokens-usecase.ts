import { Injectable } from '@nestjs/common';
import { FcmRepository } from '../repositories/fcm-repository';
import { messaging as Fcm } from 'firebase-admin';

@Injectable()
export class SendFcmToTokensUsecase {
  constructor(private readonly fcmRepository: FcmRepository) {}

  async call(
    token: string[],
    content: Fcm.NotificationMessagePayload,
    data: Fcm.DataMessagePayload,
  ): Promise<void> {
    await this.fcmRepository.sendFcmToTokens(token, content, data);
  }
}
