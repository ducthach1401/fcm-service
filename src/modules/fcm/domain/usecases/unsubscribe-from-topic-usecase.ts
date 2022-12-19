import { Injectable } from '@nestjs/common';
import { FcmRepository } from '../repositories/fcm-repository';

@Injectable()
export class UnsubscribeFromTopicUsecase {
  constructor(private readonly fcmRepository: FcmRepository) {}

  async call(token: string[], topic: string[]): Promise<void> {
    await this.fcmRepository.unsubscribeFromTopic(token, topic);
  }
}
