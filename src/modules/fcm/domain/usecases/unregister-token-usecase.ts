import { Injectable } from '@nestjs/common';
import { FcmRepository } from '../repositories/fcm-repository';

@Injectable()
export class UnregisterTokenUsecase {
  constructor(private readonly fcmRepository: FcmRepository) {}

  async call(token: string): Promise<void> {
    await this.fcmRepository.unregister(token);
  }
}
