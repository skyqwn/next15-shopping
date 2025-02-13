import { Module } from '@nestjs/common';

import { RedisClient } from './redis.client';
import { RefreshTokenCacheStore } from './store';

@Module({
  imports: [],
  providers: [RedisClient, RefreshTokenCacheStore],
  exports: [RedisClient, RefreshTokenCacheStore],
})
export class CacheModule {}
