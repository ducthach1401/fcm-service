import { messaging as Fcm } from 'firebase-admin';

export abstract class FcmRepository {
  abstract sendFcmToTokens(
    tokens: string[],
    content: Fcm.NotificationMessagePayload,
    data: Fcm.DataMessagePayload,
  ): Promise<void>;

  abstract sendFcmToTopics(
    topics: string[],
    content: Fcm.NotificationMessagePayload,
    data: Fcm.DataMessagePayload,
  ): Promise<void>;

  abstract subscribeToTopic(tokens: string[], topics: string[]): Promise<void>;

  abstract unsubscribeFromTopic(
    tokens: string[],
    topics: string[],
  ): Promise<void>;
}
