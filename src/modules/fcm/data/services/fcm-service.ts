import { Injectable } from '@nestjs/common';
import {
  NotificationMessagePayload,
  DataMessagePayload,
  MessagingPayload,
  MessagingOptions,
} from 'firebase-admin/lib/messaging/messaging-api';
import { messaging as Fcm } from 'firebase-admin';

@Injectable()
export class FcmService {
  private normalize(data: any) {
    for (const key in data) {
      if (typeof data[key] !== 'string') {
        data[key] = JSON.stringify(data[key]);
      }
    }
    return data;
  }

  async sendFcmToTokens(
    tokens: string[],
    content: NotificationMessagePayload,
    data: DataMessagePayload,
  ): Promise<void> {
    if (tokens.length === 0) {
      return;
    }

    const payload: MessagingPayload = {};
    if (content) {
      payload.notification = this.normalize(content);
    }
    if (data) {
      payload.data = this.normalize(data);
    }
    const options: MessagingOptions = {
      content_available: true,
    };

    await Fcm().sendToDevice(tokens, payload, options);
  }

  async sendFcmToTopics(
    topics: string[],
    content: NotificationMessagePayload,
    data: DataMessagePayload,
  ): Promise<void> {
    if (topics.length === 0) {
      return;
    }

    const payload: MessagingPayload = {};
    if (content) {
      payload.notification = this.normalize(content);
    }
    if (data) {
      payload.data = this.normalize(data);
    }
    const options: MessagingOptions = {
      content_available: true,
    };

    for (const topic of topics) {
      await Fcm().sendToTopic(topic, payload, options);
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
