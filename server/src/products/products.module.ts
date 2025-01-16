import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [DrizzleModule, RedisModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
