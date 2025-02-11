import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto, PatchProductDto } from './dto/create-product.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/redis/redis.service';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { products } from 'src/drizzle/schema/products.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async createProduct({ description, price, title }: CreateProductDto) {
    const newProduct = await this.db
      .insert(products)
      .values({
        description,
        price: price,
        title,
      })
      .returning();

    return newProduct[0];
  }

  async getProducts() {
    const products = await this.db.query.products.findMany({
      with: {
        productVariants: { with: { variantImages: true } },
      },
      orderBy: (products, { desc }) => [desc(products.id)],
    });

    return products;
  }

  async deleteProduct(id: number) {
    try {
      const data = await this.db
        .delete(products)
        .where(eq(products.id, id))
        .returning();
      return { message: `${data[0].title}을 삭제하였습니다.` };
    } catch (error) {
      console.log(error);
    }
  }
  async getProductDetail(id: number) {
    try {
      const product = await this.db.query.products.findFirst({
        where: eq(products.id, id),
        with: {
          productVariants: { with: { variantImages: true, variantTags: true } },
        },
      });

      if (!product) throw new Error('상품이 존재하지 않습니다.');

      return { product };
    } catch (error) {
      console.log(error);
    }
  }

  async patchProductDetail(
    productId: number,
    { description, price, title }: PatchProductDto,
  ) {
    try {
      const editedProduct = await this.db
        .update(products)
        .set({ description, price, title })
        .where(eq(products.id, productId))
        .returning();

      return { message: `${editedProduct[0].title}이 수정되었습니다.` };
    } catch (error) {}
  }
}
