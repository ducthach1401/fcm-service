import { DomainModel } from 'src/core/models/domain-model';

export class FcmTokenModel extends DomainModel {
  public readonly id: string;
  public readonly token: string;
  public readonly topic: string;
  public readonly platform: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: string,
    token: string,
    topic: string,
    platform: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.token = token;
    this.topic = topic;
    this.platform = platform;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJson(showHidden: boolean): Record<string, any> {
    return this.filterHiddenIfNeed(
      {
        id: this.id,
        token: this.token,
        topic: this.topic,
        platform: this.platform,
        created_at: this.createdAt,
        updated_at: this.updatedAt,
      },
      showHidden,
    );
  }
}
