import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Effect } from 'effect';
import Redis from 'ioredis';

@Injectable()
export class RedisClient implements OnModuleDestroy {
  private readonly redis: Redis;
  private readonly logger = new Logger(RedisClient.name);

  constructor(private readonly configService: ConfigService) {
    const environment = this.configService.get<string>(
      'NODE_ENV',
      'development',
    );
    console.log(`Running in ${environment} environment`);

    if (environment === 'production') {
      const upstashUrl =
        this.configService.getOrThrow<string>('UPSTASH_REDIS_URL');
      this.redis = new Redis(upstashUrl);
    } else {
      const host = this.configService.getOrThrow<string>('REDIS_HOST');
      const port = this.configService.getOrThrow<number>('REDIS_PORT');
      const password = this.configService.getOrThrow<string>('REDIS_PASSWORD');
      this.redis = new Redis({
        host,
        port,
        password,
      });
    }

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

  expire(key: string, seconds: number) {
    return Effect.tryPromise(() =>
      this.redis.expire(key, seconds).then(() => void 0),
    );
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

  lpush(prefix: string, value: string) {
    return Effect.tryPromise(() =>
      this.redis.lpush(`${prefix}`, value).then(() => void 0),
    );
  }

  lrem(prefix: string, count: number, value: string) {
    return Effect.tryPromise(() =>
      this.redis.lrem(`${prefix}`, count, value).then(() => void 0),
    );
  }

  ltrim(prefix: string, start: number, stop: number) {
    return Effect.tryPromise(() =>
      this.redis.ltrim(`${prefix}`, start, stop).then(() => void 0),
    );
  }

  lrange(prefix: string, start: number, stop: number) {
    return Effect.tryPromise(() => this.redis.lrange(`${prefix}`, start, stop));
  }
}
