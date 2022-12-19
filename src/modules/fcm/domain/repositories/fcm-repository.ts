import { messaging as Fcm } from 'firebase-admin';
import { FcmTokenModel } from '../models/fcm-model';

export abstract class FcmRepository {
  abstract register(fcmToken: FcmTokenModel): Promise<void>;

  abstract sendFcmToTokens(
    token: string[],
    content: Fcm.NotificationMessagePayload,
    data: Fcm.DataMessagePayload,
  ): Promise<void>;

  abstract sendFcmToTopics(
    topics: string[],
    content: Fcm.NotificationMessagePayload,
    data: Fcm.DataMessagePayload,
  ): Promise<void>;

  abstract subscribeToTopic(token: string[], topic: string[]): Promise<void>;

  abstract unsubscribeFromTopic(
    token: string[],
    topic: string[],
  ): Promise<void>;

  abstract unregister(token: string): Promise<void>;
}
