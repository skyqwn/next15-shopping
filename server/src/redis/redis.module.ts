// redis/redis.module.ts
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    IORedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
  ],
  // imports: [
  //   CacheModule.register({
  //     isGlobal: true,
  //     ttl: 300 * 1000,
  //     store: redisStore,
  //   }),
  // ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
