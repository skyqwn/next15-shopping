import { Inject, Injectable } from '@nestjs/common';
import { eq, and, ilike, desc, asc, or, SQL } from 'drizzle-orm';
import { Effect, pipe } from 'effect';

import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import { DrizzleDB } from 'src/infrastructure/drizzle/types/drizzle';
import { AppNotFoundException } from 'src/domain/exceptions';
import { ErrorCodes } from 'src/common/error';

import { BaseRepository } from './base.repository';

import { ProductModel } from 'src/domain/model/product.model';
import { PgTable } from 'drizzle-orm/pg-core';
import {
  ProductInsertType,
  products,
  ProductSelectType,
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
        this.db.select().from(products).where(eq(products.id, id)).limit(1),
      ),
      Effect.map((results) => {
        const product = results[0];
        return product ? ProductModel.from(product) : null;
      }),
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
              },
            },
          },
        }),
      ),
      Effect.map((products) => {
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
  }): Effect.Effect<ProductModel[], Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.products.findMany({
          with: {
            productVariants: { with: { variantImages: true } },
          },
          where: params.search
            ? or(
                ilike(products.title, `%${params.search}%`),
                // ilike(products.brand, `%${params.search}%`),
              )
            : undefined,
          orderBy:
            params.sort === 'latest'
              ? desc(products.createdAt)
              : params.sort === 'price_high'
                ? desc(products.price)
                : params.sort === 'price_low'
                  ? asc(products.price)
                  : desc(products.createdAt),
        }),
      ),
      Effect.map((products: ProductModel[]) => {
        return products.map(ProductModel.from);
      }),
      Effect.catchAll((error) => {
        console.error('Query error:', error);
        return Effect.succeed([]);
      }),
    );
  }

  private applySorting(query: any, sortOption: SortOption): any {
    switch (sortOption) {
      case 'latest':
        return query.orderBy(desc(products.createdAt));
      case 'price_high':
        return query.orderBy(desc(products.price));
      case 'price_low':
        return query.orderBy(asc(products.price));
      case 'popular':
      default:
        return query.orderBy(desc(products.createdAt));
    }
  }
}
