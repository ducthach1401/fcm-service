import { Injectable } from '@nestjs/common';
import {
  NotificationMessagePayload,
  DataMessagePayload,
  MessagingPayload,
} from 'firebase-admin/lib/messaging/messaging-api';
import { messaging as Fcm } from 'firebase-admin';

@Injectable()
export class FcmService {
  async sendFcmToTokens(
    tokens: string[],
    content: NotificationMessagePayload,
    data: DataMessagePayload,
  ): Promise<void> {
    const payload: MessagingPayload = {
      data: data,
      notification: content,
    };
    await Fcm().sendToDevice(tokens, payload);
  }

  async sendFcmToTopics(
    topics: string[],
    content: NotificationMessagePayload,
    data: DataMessagePayload,
  ): Promise<void> {
    const payload: MessagingPayload = {
      data: data,
      notification: content,
    };
    for (const topic of topics) {
      await Fcm().sendToTopic(topic, payload);
    }
  }

  async subscribeToTopic(tokens: string[], topics: string[]): Promise<void> {
    for (const topic of topics) {
      await Fcm().subscribeToTopic(tokens, topic);
    }
  }

  async unsubscribeFromTopic(
    tokens: string[],
    topics: string[],
  ): Promise<void> {
    for (const topic of topics) {
      await Fcm().unsubscribeFromTopic(tokens, topic);
    }
  }
}
