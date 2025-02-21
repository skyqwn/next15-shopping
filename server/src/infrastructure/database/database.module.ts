import { Module } from '@nestjs/common';
import {
  ProductRepository,
  S3Repository,
  UserRepository,
} from './repositories';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [UserRepository, S3Repository, ProductRepository],
  exports: [UserRepository, DrizzleModule, S3Repository, ProductRepository],
})
export class DatabaseModule {}
