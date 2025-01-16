import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { DRIZZLE, DrizzleModule } from 'src/drizzle/drizzle.module';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleModule,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }
}
