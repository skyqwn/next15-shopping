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
  private readonly MAX_VIEWED_PRODUCTS = 5;
  private readonly VIEWED_PRODUCTS_PREFIX = 'viewed_products';

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
      Effect.sync(() => console.time(`캐시-데이터-조회-${productId}`)),
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
        console.timeEnd(`캐시-데이터-조회-${productId}`);
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

  addViewedProduct(
    userId: number,
    productId: number,
    expirySeconds: number = 60 * 60 * 24 * 3,
  ): Effect.Effect<void, Error> {
    const key = `${this.VIEWED_PRODUCTS_PREFIX}:${userId}`;
    const productIdStr = productId.toString();

    return pipe(
      this.redisClient.lrem(key, 0, productIdStr),
      Effect.flatMap(() => this.redisClient.lpush(key, productIdStr)),
      Effect.flatMap(() =>
        this.redisClient.ltrim(key, 0, this.MAX_VIEWED_PRODUCTS - 1),
      ),
      Effect.flatMap(() => this.redisClient.expire(key, expirySeconds)),
      Effect.tap(() =>
        Effect.sync(() =>
          this.logger.log(
            `Product ${productId} added to viewed products for user ${userId} with ${expirySeconds} seconds expiry`,
          ),
        ),
      ),
      Effect.catchAll((error) => {
        this.logger.error(
          `Failed to add viewed product: ${error.message}`,
          error.stack,
        );
        return Effect.fail(error);
      }),
    );
  }

  getViewedProducts(userId: number): Effect.Effect<number[], Error> {
    const key = `${this.VIEWED_PRODUCTS_PREFIX}:${userId}`;

    return pipe(
      this.redisClient.lrange(key, 0, this.MAX_VIEWED_PRODUCTS - 1),
      Effect.map((productIds) => productIds.map(Number)),
      Effect.tap((productIds) =>
        Effect.sync(() =>
          this.logger.log(
            `Retrieved ${productIds.length} viewed products for user ${userId}`,
          ),
        ),
      ),
      Effect.catchAll((error) => {
        this.logger.error(
          `Failed to get viewed products: ${error.message}`,
          error.stack,
        );
        return Effect.fail(error);
      }),
    );
  }
}
