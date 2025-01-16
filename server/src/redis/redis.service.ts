import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private redisClient: Redis) {}

  get(key: string) {
    return this.redisClient.get(key);
  }

  set(key: string, value: string, expire?: number) {
    return this.redisClient.set(key, value, 'EX', expire ?? 3600);
  }

  del(key: string) {
    return this.redisClient.del(key);
  }

  async setRefreshToken(userId: number, token: string) {
    try {
      const ttl = 60 * 60 * 24 * 14 * 1000;
      const key = `refreshToken:${userId}`;

      await this.redisClient.set(key, token, 'EX', ttl);
      const saved = await this.redisClient.get(key);
      // const ttl = await this.redisClient.store.ttl(key);
    } catch (error) {
      console.error('redisClient 저장 에러:', error);
      throw error;
    }
  }
  async getRefreshToken(userId: number) {
    try {
      const key = `refreshToken:${userId}`;

      return this.redisClient.get(key);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRefreshToken(userId: number) {
    await this.redisClient.del(`refreshToken:"${userId}`);
  }

  async setEmailVerificationToken(email: string, token: string) {
    try {
      const TTL = 60 * 60 * 24 * 1 * 1000;
      const key = `${email}_verification`;
      await this.redisClient.set(key, token, 'EX', TTL);

      const saved = await this.redisClient.get(key);
      // const ttl = await this.redisClient.store.ttl(key);

      console.log('Email verification token saved:', { key, saved, TTL });
    } catch (error) {
      console.error('redisClient 저장 에러:', error);
      throw error;
    }
  }
  async getEmailVerificationToken(email: string) {
    try {
      const key = `${email}_verification`;
      return this.redisClient.get(key);
    } catch (error) {
      console.error('redisClient 조회 에러:', error);
      throw error;
    }
  }

  async deleteEmailVerificationToken(email: string) {
    try {
      const key = `${email}_verification`;
      await this.redisClient.del(key);
    } catch (error) {
      console.error('redisClient 삭제 에러:', error);
      throw error;
    }
  }
}
