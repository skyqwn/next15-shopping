import { Module } from '@nestjs/common';
import {
  ProductRepository,
  S3Repository,
  UserRepository,
} from './repositories';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { ProductVariantRepository } from './repositories/variant.repository';

@Module({
  imports: [DrizzleModule],
  providers: [
    UserRepository,
    S3Repository,
    ProductRepository,
    ProductVariantRepository,
  ],
  exports: [
    UserRepository,
    DrizzleModule,
    S3Repository,
    ProductRepository,
    ProductVariantRepository,
  ],
})
export class DatabaseModule {}
