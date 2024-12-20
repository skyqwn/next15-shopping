import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setRefreshToken(email: string, token: string) {
    try {
      const TTL = 60 * 6000 * 24 * 7; // 7일
      const key = `refresh_${email}`;

      await this.cacheManager.set(key, token, TTL);

      // 저장 확인
      const saved = await this.cacheManager.get(key);
      const ttl = await this.cacheManager.store.ttl(key);

      console.log({
        key,
        saved: !!saved,
        ttl,
      });
    } catch (error) {
      console.error('Redis 저장 에러:', error);
      throw error;
    }
  }

  async deleteRefreshToken(email: string) {
    await this.cacheManager.del(`refresh_${email}`);
  }
}
