import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { DrizzleModule } from './drizzle/drizzle.module';
import { CacheModule } from './cache';
import { JwtStragegy } from './auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [JwtStragegy],
  imports: [
    DatabaseModule,
    DrizzleModule,
    CacheModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [
    DatabaseModule,
    DrizzleModule,
    CacheModule,
    JwtStragegy,
    PassportModule,
  ],
})
export class InfrastructureModule {}
