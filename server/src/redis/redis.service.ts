import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setRefreshToken(userId: number, token: string) {
    try {
      const TTL = 60 * 6000 * 24 * 7; // 7일
      const key = `refresh_${userId}`;

      await this.cacheManager.set(key, token, TTL);

      const saved = await this.cacheManager.get(key);
      const ttl = await this.cacheManager.store.ttl(key);
    } catch (error) {
      console.error('Redis 저장 에러:', error);
      throw error;
    }
  }
  async getRefreshToken(userId: number): Promise<string | undefined> {
    try {
      const key = `refresh_${userId}`;
      return this.cacheManager.get(key);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRefreshToken(userId: number) {
    await this.cacheManager.del(`refresh_${userId}`);
  }

  async setEmailVerificationToken(email: string, token: string) {
    try {
      const TTL = 60 * 6000 * 1;
      const key = `${email}_verification`;
      await this.cacheManager.set(key, token, TTL);

      const saved = await this.cacheManager.get(key);
      const ttl = await this.cacheManager.store.ttl(key);

      console.log('Email verification token saved:', { key, saved, ttl });
    } catch (error) {
      console.error('Redis 저장 에러:', error);
      throw error;
    }
  }
  async getEmailVerificationToken(email: string): Promise<string | undefined> {
    try {
      const key = `${email}_verification`;
      return this.cacheManager.get(key);
    } catch (error) {
      console.error('Redis 조회 에러:', error);
      throw error;
    }
  }

  async deleteEmailVerificationToken(email: string) {
    try {
      const key = `${email}_verification`;
      await this.cacheManager.del(key);
    } catch (error) {
      console.error('Redis 삭제 에러:', error);
      throw error;
    }
  }
}
