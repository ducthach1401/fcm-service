import { Injectable } from '@nestjs/common';
import { FcmTokenModel } from '../models/fcm-model';
import { FcmRepository } from '../repositories/fcm-repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegisterTokenUsecase {
  constructor(private readonly fcmRepository: FcmRepository) {}

  async call(
    token: string,
    topic: string,
    platform: string | undefined,
  ): Promise<void> {
    const fcmToken = new FcmTokenModel(
      uuidv4(),
      token,
      topic,
      platform,
      new Date(),
      new Date(),
    );
    await this.fcmRepository.register(fcmToken);
  }
}
