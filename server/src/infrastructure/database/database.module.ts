import { Module } from '@nestjs/common';
import { S3Repository, UserRepository } from './repositories';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [UserRepository, S3Repository],
  exports: [UserRepository, DrizzleModule, S3Repository],
})
export class DatabaseModule {}
