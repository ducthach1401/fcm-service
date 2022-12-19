import { Injectable } from '@nestjs/common';
import { FcmRepository } from '../repositories/fcm-repository';

@Injectable()
export class UnsubscribeFromTopicUsecase {
  constructor(private readonly fcmRepository: FcmRepository) {}

  async call(tokens: string[], topics: string[]): Promise<void> {
    await this.fcmRepository.unsubscribeFromTopic(tokens, topics);
  }
}
