import { Module } from '@nestjs/common';

import { RedisClient } from './redis.client';
import { RefreshTokenCacheStore, UserCacheStore } from './store';

@Module({
  imports: [],
  providers: [RedisClient, RefreshTokenCacheStore, UserCacheStore],
  exports: [RedisClient, RefreshTokenCacheStore, UserCacheStore],
})
export class CacheModule {}
