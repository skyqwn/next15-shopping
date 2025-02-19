import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Effect } from 'effect';
import Redis from 'ioredis';

@Injectable()
export class RedisClient implements OnModuleDestroy {
  private readonly redis: Redis;
  private readonly logger = new Logger(RedisClient.name);

  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis({
      host: this.configService.getOrThrow('REDIS_HOST'),
      port: this.configService.getOrThrow('REDIS_PORT'),
      password: this.configService.getOrThrow('REDIS_PASSWORD'),
    });

    this.redis.on('connecting', () => {
      this.logger.log('Redis 연결 시도 중...');
    });

    this.redis.on('connect', () => {
      this.logger.log('Redis 서버에 연결됨');
    });

    this.redis.on('error', (error) => {
      this.logger.error('Redis 에러 발생:', error.message);
      if (error.message.includes('NOAUTH')) {
        this.logger.error('Redis 인증 실패. 비밀번호를 확인해주세요.');
      }
    });

    this.redis.on('close', () => {
      this.logger.warn('Redis 연결이 닫힘');
    });

    this.redis.on('reconnecting', () => {
      this.logger.warn('Redis 재연결 시도 중...');
    });
  }

  onModuleDestroy() {
    this.redis.disconnect();
  }

  get(prefix: string, key: string) {
    return Effect.tryPromise(() => this.redis.get(`${prefix}:${key}`)).pipe(
      Effect.catchAll((e) => {
        return Effect.succeed(null);
      }),
    );
  }

  set(prefix: string, key: string, value: string) {
    return Effect.tryPromise(() => this.redis.set(`${prefix}:${key}`, value));
  }

  delete(prefix: string, key: string): Effect.Effect<void, Error> {
    const fullKey = `${prefix}:${key}`;
    return Effect.tryPromise(() => this.redis.del(fullKey).then(() => void 0));
  }

  setWithExpiry(prefix: string, key: string, value: string, expiry: number) {
    return Effect.tryPromise(() =>
      this.redis.set(`${prefix}:${key}`, value, 'EX', expiry),
    );
  }

  zadd(prefix: string, key: string, score: number | string, value: string) {
    return Effect.tryPromise(() =>
      this.redis.zadd(`${prefix}:${key}`, score, value),
    );
  }

  // 전체 멤버 수 카운트
  zcount(prefix: string, key: string) {
    return Effect.tryPromise(() =>
      this.redis.zcount(`${prefix}:${key}`, '-inf', '+inf'),
    );
  }

  // 점수 범위 삭제
  zremrangebyscore(
    prefix: string,
    key: string,
    min: number | string,
    max: number | string,
  ) {
    return Effect.tryPromise(() =>
      this.redis.zremrangebyscore(`${prefix}:${key}`, min, max),
    );
  }

  // 패턴 매칭 스캔
  zscan(prefix: string, key: string, pattern: string) {
    return Effect.tryPromise(() =>
      this.redis.zscan(`${prefix}:${key}`, 0, 'MATCH', pattern),
    );
  }

  // 멤버 삭제
  zrem(prefix: string, key: string, ...members: string[]) {
    return Effect.tryPromise(() =>
      this.redis.zrem(`${prefix}:${key}`, ...members),
    );
  }
}
