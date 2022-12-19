import { Injectable } from '@nestjs/common';
import {
  NotificationMessagePayload,
  DataMessagePayload,
} from 'firebase-admin/lib/messaging/messaging-api';
import { FcmRepository } from '../../domain/repositories/fcm-repository';
import { FcmService } from '../services/fcm-service';

@Injectable()
export class FcmRepositoryImpl extends FcmRepository {
  constructor(private readonly fcmService: FcmService) {
    super();
  }

  async sendFcmToTokens(
    tokens: string[],
    content: NotificationMessagePayload,
    data: DataMessagePayload,
  ): Promise<void> {
    await this.fcmService.sendFcmToTokens(tokens, content, data);
  }

  async sendFcmToTopics(
    topics: string[],
    content: NotificationMessagePayload,
    data: DataMessagePayload,
  ): Promise<void> {
    await this.fcmService.sendFcmToTopics(topics, content, data);
  }

  async subscribeToTopic(tokens: string[], topic: string[]): Promise<void> {
    await this.fcmService.subscribeToTopic(tokens, topic);
  }

  async unsubscribeFromTopic(tokens: string[], topic: string[]): Promise<void> {
    await this.fcmService.unsubscribeFromTopic(tokens, topic);
  }
}
