import { Module } from '@nestjs/common';

import { RedisClient } from './redis.client';
import {
  ProductCacheStore,
  RefreshTokenCacheStore,
  UserCacheStore,
} from './store';

@Module({
  imports: [],
  providers: [
    RedisClient,
    RefreshTokenCacheStore,
    UserCacheStore,
    ProductCacheStore,
  ],
  exports: [
    RedisClient,
    RefreshTokenCacheStore,
    UserCacheStore,
    ProductCacheStore,
  ],
})
export class CacheModule {}
