import { Injectable, Logger } from '@nestjs/common';
import { RedisClient } from '../redis.client';
import { Effect, pipe } from 'effect';
import { ConfigService } from '@nestjs/config';
import { AppAuthException } from 'src/domain/exceptions';
import { ErrorCodes } from 'src/common/error';

@Injectable()
export class RefreshTokenCacheStore {
  private readonly logger = new Logger(RefreshTokenCacheStore.name);

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

  findBy(userId: string): Effect.Effect<string | null, Error> {
    return pipe(
      this.redisClient.get('refreshToken', userId),
      Effect.flatMap((cachedToken) =>
        cachedToken
          ? Effect.succeed(cachedToken)
          : Effect.fail(new AppAuthException(ErrorCodes.USER_TOKEN_EXPIRED)),
      ),
      Effect.tapError((error) =>
        Effect.sync(() =>
          this.logger.error(
            `리프레시 토큰 조회 실패: ${JSON.stringify(error)}`,
          ),
        ),
      ),
    );
  }

  remove(key: string): Effect.Effect<void, Error> {
    return this.redisClient.delete('refreshToken', key);
  }
}
