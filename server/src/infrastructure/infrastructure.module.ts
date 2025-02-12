import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { DrizzleModule } from './drizzle/drizzle.module';
import { CacheModule } from './cache';

@Module({
  imports: [DatabaseModule, DrizzleModule, CacheModule],
  exports: [DatabaseModule, DrizzleModule, CacheModule],
})
export class InfrastructureModule {}
