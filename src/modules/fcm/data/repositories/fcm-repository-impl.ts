import { Injectable } from '@nestjs/common';
import { FcmRepository } from '../../domain/repositories/fcm-repository';

@Injectable()
export class FcmRepositoryImpl extends FcmRepository {
  constructor() {
    super();
  }
}
