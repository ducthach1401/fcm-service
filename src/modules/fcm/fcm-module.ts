import { Module } from '@nestjs/common';
import { FcmController } from './app/http/controllers/fcm-controller';
import { FcmRepositoryImpl } from './data/repositories/fcm-repository-impl';
import { FcmService } from './data/services/fcm-service';
import { FcmRepository } from './domain/repositories/fcm-repository';
import { SendFcmToTokensUsecase } from './domain/usecases/send-fcm-to-tokens-usecase';
import { SendFcmToTopicsUsecase } from './domain/usecases/send-fcm-to-topics-usecase';
import { SubscribeToTopicUsecase } from './domain/usecases/subscribe-to-topic-usecase';
import { UnsubscribeFromTopicUsecase } from './domain/usecases/unsubscribe-from-topic-usecase';

@Module({
  imports: [],
  controllers: [FcmController],
  providers: [
    {
      provide: FcmRepository,
      useClass: FcmRepositoryImpl,
    },
    FcmService,
    SendFcmToTokensUsecase,
    SendFcmToTopicsUsecase,
    UnsubscribeFromTopicUsecase,
    SubscribeToTopicUsecase,
  ],
})
export class FcmModule {}
