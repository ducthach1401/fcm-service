import { IntersectionType, PickType } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class SendFcmToTokensBodyDto {
  @IsString({ each: true })
  @IsArray()
  tokens: string[];

  @IsOptional()
  @IsObject()
  content: Record<string, any>;

  @IsOptional()
  @IsObject()
  data: Record<string, any>;
}

export class SendFcmToTopicsBodyDto extends PickType(SendFcmToTokensBodyDto, [
  'content',
  'data',
]) {
  @IsString({ each: true })
  @IsArray()
  topics: string[];
}

export class SubscribeToTopicBodyDto extends IntersectionType(
  PickType(SendFcmToTokensBodyDto, ['tokens']),
  PickType(SendFcmToTopicsBodyDto, ['topics']),
) {}

export class UnsubscribeFromTopicBodyDto extends PickType(
  SubscribeToTopicBodyDto,
  ['tokens', 'topics'],
) {}
