import { Inject, Injectable } from '@nestjs/common';
import { eq, ilike, desc, asc, or, SQL, sql } from 'drizzle-orm';
import { Effect, pipe } from 'effect';

import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import { DrizzleDB } from 'src/infrastructure/drizzle/types/drizzle';
import { AppNotFoundException } from 'src/domain/exceptions';
import { ErrorCodes } from 'src/common/error';

import { BaseRepository } from './base.repository';

import { ProductModel } from 'src/domain/model/product.model';
import {
  ProductInsertType,
  products,
  ProductUpdateType,
} from 'src/infrastructure/drizzle/schema/products.schema';

type SortOption = 'popular' | 'latest' | 'price_high' | 'price_low';

@Injectable()
export class ProductRepository
  implements BaseRepository<ProductInsertType, ProductModel>
{
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(data: ProductInsertType): Effect.Effect<ProductModel, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.insert(products).values(data).returning(),
      ),
      Effect.map(([product]) => ProductModel.from(product)),
    );
  }

  update(
    id: number,
    data: ProductUpdateType,
  ): Effect.Effect<ProductModel, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db
          .update(products)
          .set(data)
          .where(eq(products.id, id))
          .returning(),
      ),
      Effect.map(([product]) => ProductModel.from(product)),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.PRODUCT_NOT_FOUND)),
      ),
    );
  }

  delete(id: number): Effect.Effect<void, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.delete(products).where(eq(products.id, id)),
      ),
      Effect.map(() => void 0),
    );
  }

  findOneBy(id: number): Effect.Effect<ProductModel | null, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.products.findFirst({
          where: eq(products.id, id),
          with: {
            productVariants: {
              with: {
                variantImages: true,
                variantTags: true,
              },
            },
          },
        }),
      ),
      Effect.map((product) => (product ? ProductModel.from(product) : null)),
    );
  }

  getById(id: number): Effect.Effect<ProductModel, Error> {
    return pipe(
      this.findOneBy(id),
      Effect.flatMap((product) =>
        product
          ? Effect.succeed(product)
          : Effect.fail(new AppNotFoundException(ErrorCodes.PRODUCT_NOT_FOUND)),
      ),
    );
  }

  findAll(): Effect.Effect<ProductModel[], Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.products.findMany({
          with: {
            productVariants: {
              with: {
                variantImages: true,
                variantTags: true,
              },
            },
          },
        }),
      ),
      Effect.map((products) => {
        console.log(products);
        return products.map(ProductModel.from);
      }),
      Effect.catchAll((error) => {
        console.error('Query error:', error);
        return Effect.succeed([]);
      }),
    );
  }

  findAllWithFilters(params: {
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }): Effect.Effect<
    { data: ProductModel[]; total: number; hasMore: boolean },
    Error
  > {
    const page = parseInt(params.page || '1', 10);
    const limit = parseInt(params.limit || '20', 10);
    const skip = (page - 1) * limit;

    return pipe(
      Effect.tryPromise(() =>
        this.db
          .select({ count: sql`count(*)`.mapWith(Number) })
          .from(products)
          .where(
            params.search
              ? or(ilike(products.title, `%${params.search}%`))
              : undefined,
          )
          .then((result) => result[0].count),
      ),
      Effect.flatMap((total) =>
        pipe(
          Effect.tryPromise(() =>
            this.db.query.products.findMany({
              with: {
                productVariants: {
                  with: {
                    variantImages: true,
                    variantTags: true,
                    product: true,
                  },
                },
              },
              where: params.search
                ? or(ilike(products.title, `%${params.search}%`))
                : undefined,
              orderBy:
                params.sort === 'latest'
                  ? desc(products.createdAt)
                  : params.sort === 'price_high'
                    ? desc(products.price)
                    : params.sort === 'price_low'
                      ? asc(products.price)
                      : desc(products.createdAt),
              limit,
              offset: skip,
            }),
          ),
          Effect.map((products: ProductModel[]) => ({
            data: products.map(ProductModel.from),
            total,
            hasMore: skip + products.length < total,
          })),
        ),
      ),
      Effect.catchAll((error) => {
        console.error('Query error:', error);
        return Effect.succeed({ data: [], total: 0, hasMore: false });
      }),
    );
  }
}
