import { Injectable } from '@nestjs/common';
import { FcmRepository } from '../repositories/fcm-repository';

@Injectable()
export class SubscribeToTopicUsecase {
  constructor(private readonly fcmRepository: FcmRepository) {}

  async call(token: string[], topic: string[]): Promise<void> {
    await this.fcmRepository.subscribeToTopic(token, topic);
  }
}
