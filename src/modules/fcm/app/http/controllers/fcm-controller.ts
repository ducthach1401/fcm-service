import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { normalizeResponseData } from 'src/core/helpers/utils';
import { SendFcmToTokensUsecase } from 'src/modules/fcm/domain/usecases/send-fcm-to-tokens-usecase';
import { SendFcmToTopicsUsecase } from 'src/modules/fcm/domain/usecases/send-fcm-to-topics-usecase';
import { SubscribeToTopicUsecase } from 'src/modules/fcm/domain/usecases/subscribe-to-topic-usecase';
import { UnsubscribeFromTopicUsecase } from 'src/modules/fcm/domain/usecases/unsubscribe-from-topic-usecase';
import {
  SendFcmToTokensBodyDto,
  SendFcmToTopicsBodyDto,
  SubscribeToTopicBodyDto,
  UnsubscribeFromTopicBodyDto,
} from '../../dtos/fcm-dto';

@Controller('api/v1/fcm')
export class FcmController {
  constructor(
    private readonly sendFcmToTokensUsecase: SendFcmToTokensUsecase,
    private readonly sendFcmToTopicsUsecase: SendFcmToTopicsUsecase,
    private readonly unsubscribeFromTopicUsecase: UnsubscribeFromTopicUsecase,
    private readonly subscribeToTopicUsecase: SubscribeToTopicUsecase,
  ) {}

  @Post('send/tokens')
  async sendFcmToTokens(
    @Body() body: SendFcmToTokensBodyDto,
    @Res() res: Response,
  ) {
    await this.sendFcmToTokensUsecase.call(
      body.tokens,
      body.content,
      body.data,
    );

    res.status(HttpStatus.OK).json(normalizeResponseData(true));
  }

  @Post('send/topics')
  async sendFcmToTopics(
    @Body() body: SendFcmToTopicsBodyDto,
    @Res() res: Response,
  ) {
    await this.sendFcmToTopicsUsecase.call(
      body.topics,
      body.content,
      body.data,
    );

    res.status(HttpStatus.OK).json(normalizeResponseData(true));
  }

  @Post('subscribe')
  async subscribe(@Body() body: SubscribeToTopicBodyDto, @Res() res: Response) {
    await this.subscribeToTopicUsecase.call(body.tokens, body.topics);
    res.status(HttpStatus.OK).json(normalizeResponseData(true));
  }

  @Post('unsubscribe')
  async unsubscribe(
    @Body() body: UnsubscribeFromTopicBodyDto,
    @Res() res: Response,
  ) {
    await this.subscribeToTopicUsecase.call(body.tokens, body.topics);
    res.status(HttpStatus.OK).json(normalizeResponseData(true));
  }
}
