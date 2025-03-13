import { Injectable, Logger } from '@nestjs/common';
import { RedisClient } from '../redis.client';
import { Effect, pipe } from 'effect';
import { ConfigService } from '@nestjs/config';
import { UserSelectType } from 'src/infrastructure/drizzle/schema/users.schema';

@Injectable()
export class UserCacheStore {
  private readonly logger = new Logger(UserCacheStore.name);
  private readonly CACHE_PREFIX = 'user';
  private readonly CACHE_EXPIRY = 60 * 60; // 1시간

  constructor(
    private readonly redisClient: RedisClient,
    private readonly configService: ConfigService,
  ) {}

  cache(userId: string, userInfo: UserSelectType): Effect.Effect<void, Error> {
    return pipe(
      Effect.sync(() => JSON.stringify(userInfo)),
      Effect.flatMap((userInfoString) =>
        this.redisClient.setWithExpiry(
          this.CACHE_PREFIX,
          userId,
          userInfoString,
          this.CACHE_EXPIRY,
        ),
      ),
      Effect.tap(() =>
        Effect.sync(() =>
          this.logger.log(`User info cached for userId: ${userId}`),
        ),
      ),
    );
  }

  findBy(userId: string): Effect.Effect<UserSelectType | undefined, Error> {
    return pipe(
      this.redisClient.get(this.CACHE_PREFIX, userId),
      Effect.tap((cachedData) =>
        Effect.sync(() => {
          if (cachedData) {
            this.logger.debug(`캐시 히트! userId: ${userId}`);
            console.time(`캐시-데이터-조회-${userId}`);
          } else {
            this.logger.debug(`캐시 미스! userId: ${userId}`);
          }
        }),
      ),
      Effect.map((cachedData) =>
        cachedData ? JSON.parse(cachedData) : undefined,
      ),
      Effect.tap(() =>
        Effect.sync(() => {
          console.timeEnd(`캐시-데이터-조회-${userId}`);
        }),
      ),
    );
  }

  remove(userId: string): Effect.Effect<void, Error> {
    return pipe(
      this.redisClient.delete(this.CACHE_PREFIX, userId),
      Effect.tap(() =>
        Effect.sync(() =>
          this.logger.log(`Cache removed for userId: ${userId}`),
        ),
      ),
    );
  }
}
