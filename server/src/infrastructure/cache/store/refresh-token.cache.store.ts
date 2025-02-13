import { Injectable } from '@nestjs/common';
import { RedisClient } from '../redis.client';
import { Effect, pipe } from 'effect';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenCacheStore {
  constructor(
    private readonly redisClient: RedisClient,
    private readonly configService: ConfigService,
  ) {}

  cache(userId: string, refreshToken: string): Effect.Effect<void, Error> {
    return pipe(
      this.redisClient.setWithExpiry(
        'refreshToken',
        userId,
        refreshToken,
        parseInt(
          this.configService.get('REDIS_REFRESH_TOKEN_EXPIRATION') as string,
        ),
      ),
    );
  }
}
