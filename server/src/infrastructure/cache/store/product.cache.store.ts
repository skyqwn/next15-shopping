import { Injectable, Logger } from '@nestjs/common';
import { RedisClient } from '../redis.client';
import { Effect, pipe } from 'effect';
import { ConfigService } from '@nestjs/config';
import { ProductModel } from 'src/domain/model/product.model';

@Injectable()
export class ProductCacheStore {
  private readonly logger = new Logger(ProductCacheStore.name);
  private readonly CACHE_PREFIX = 'product';
  private readonly CACHE_EXPIRY = 60 * 60; // 1시간

  constructor(
    private readonly redisClient: RedisClient,
    private readonly configService: ConfigService,
  ) {}

  cache(
    productId: string,
    productInfo: ProductModel,
  ): Effect.Effect<void, Error> {
    return pipe(
      Effect.sync(() => JSON.stringify(productInfo)),
      Effect.flatMap((productInfoString) =>
        this.redisClient.setWithExpiry(
          this.CACHE_PREFIX,
          productId,
          productInfoString,
          this.CACHE_EXPIRY,
        ),
      ),
      Effect.tap(() =>
        Effect.sync(() =>
          this.logger.log(`Product info cached for productId: ${productId}`),
        ),
      ),
    );
  }

  findBy(productId: string): Effect.Effect<ProductModel | null, Error> {
    return pipe(
      Effect.sync(() => console.time(`캐시-데이터-조회-${productId}`)), // 항상 시작
      Effect.flatMap(() => this.redisClient.get(this.CACHE_PREFIX, productId)),
      Effect.tap((cachedData) =>
        Effect.sync(() => {
          this.logger.debug('캐시 데이터:', cachedData);

          if (cachedData) {
            this.logger.debug(`캐시 히트! productId: ${productId}`);
          } else {
            this.logger.debug(`캐시 미스! productId: ${productId}`);
          }
        }),
      ),
      Effect.map((cachedData) => (cachedData ? JSON.parse(cachedData) : null)),
      Effect.tap(() =>
        Effect.sync(() => console.timeEnd(`캐시-데이터-조회-${productId}`)),
      ),
      Effect.catchAll((error) => {
        console.timeEnd(`캐시-데이터-조회-${productId}`); // 에러 발생시에도 타이머 종료
        return Effect.fail(error);
      }),
    );
  }

  remove(productId: string): Effect.Effect<void, Error> {
    return pipe(
      this.redisClient.delete(this.CACHE_PREFIX, productId),
      Effect.tap(() =>
        Effect.sync(() =>
          this.logger.log(`Cache removed for productId: ${productId}`),
        ),
      ),
    );
  }
}
