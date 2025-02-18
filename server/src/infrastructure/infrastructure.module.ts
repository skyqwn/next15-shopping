import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { DrizzleModule } from './drizzle/drizzle.module';
import { CacheModule } from './cache';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, KakaoStrategy } from './auth/strategies';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  providers: [JwtStrategy, KakaoStrategy],
  imports: [
    DatabaseModule,
    DrizzleModule,
    forwardRef(() => DomainModule),
    CacheModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [
    DatabaseModule,
    DrizzleModule,
    CacheModule,
    JwtStrategy,
    PassportModule,
    KakaoStrategy,
  ],
})
export class InfrastructureModule {}
