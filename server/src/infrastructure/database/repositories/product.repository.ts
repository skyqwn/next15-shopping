import { Inject, Injectable } from '@nestjs/common';
import { eq, and, ilike, desc, asc, or, SQL } from 'drizzle-orm';
import { Effect, pipe } from 'effect';

import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import { DrizzleDB } from 'src/infrastructure/drizzle/types/drizzle';
import { AppNotFoundException } from 'src/domain/exceptions';
import { ErrorCodes } from 'src/common/error';
import {
  NodePgQueryResultHKT,
  NodePgDatabase,
} from 'drizzle-orm/node-postgres';

import { BaseRepository } from './base.repository';
import {
  product,
  ProductInsertType,
  ProductUpdateType,
} from 'src/infrastructure/drizzle/schema/product.schema';
import { ProductModel } from 'src/domain/model/product.model';
import { PgSelect, PgSelectQueryBuilder, PgTable } from 'drizzle-orm/pg-core';
import { ProductSelectType } from 'src/infrastructure/drizzle/schema/products.schema';
type SortOption = 'popular' | 'latest' | 'price_high' | 'price_low';
type QueryType<T extends PgTable> = ReturnType<
  ReturnType<NodePgDatabase['select']>['from']
>;
@Injectable()
export class ProductRepository
  implements BaseRepository<ProductInsertType, ProductModel>
{
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(data: ProductInsertType): Effect.Effect<ProductModel, Error> {
    return pipe(
      Effect.tryPromise(() => this.db.insert(product).values(data).returning()),
      Effect.map(([product]) => ProductModel.from(product)),
    );
  }

  update(
    id: number,
    data: ProductUpdateType,
  ): Effect.Effect<ProductModel, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.update(product).set(data).where(eq(product.id, id)).returning(),
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
        this.db.delete(product).where(eq(product.id, id)),
      ),
      Effect.map(() => void 0),
    );
  }

  findOneBy(id: number): Effect.Effect<ProductModel | null, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.product.findFirst({
          where: eq(product.id, id),
        }),
      ),
      Effect.map((product) => (product ? ProductModel.from(product) : null)),
    );
  }

  findAll(): Effect.Effect<ProductModel[], Error> {
    return pipe(
      Effect.tryPromise(() => this.db.select().from(product)),
      Effect.map((products) => products.map(ProductModel.from)),
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

  findAllWithFilters(params: {
    search?: string;
    sort?: string;
  }): Effect.Effect<ProductModel[], Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.product.findMany({
          where: params.search
            ? or(
                ilike(product.name, `%${params.search}%`),
                ilike(product.brand, `%${params.search}%`),
              )
            : undefined,
          orderBy:
            params.sort === 'latest'
              ? desc(product.createdAt)
              : params.sort === 'price_high'
                ? desc(product.price)
                : params.sort === 'price_low'
                  ? asc(product.price)
                  : desc(product.createdAt),
        }),
      ),
      Effect.map((products: ProductModel[]) => {
        console.log('query result:', products);
        return products.map(ProductModel.from);
      }),
      Effect.catchAll((error) => {
        console.error('Query error:', error);
        return Effect.succeed([]);
      }),
    );
  }

  // findAllWithFilters(params: {
  //   search?: string;
  //   sort?: string;
  // }): Effect.Effect<ProductModel[], Error> {
  //   let query = this.db.select().from(product) as any;
  //   console.log('repository search:', params.search);
  //   console.log('repository sort:', params.sort);
  //   console.log('repository query:', query);

  //   if (params.search) {
  //     query = query.where(
  //       or(
  //         ilike(product.name, `%${params.search}%`),
  //         ilike(product.brand, `%${params.search}%`),
  //       ),
  //     );
  //   }

  //   if (params.sort) {
  //     query = this.applySorting(query, params.sort as SortOption);
  //   }

  //   return pipe(
  //     Effect.tryPromise(() => query.execute()),
  //     Effect.map((products: ProductModel[]) => products.map(ProductModel.from)),
  //     Effect.catchAll((error) => {
  //       console.error('Query error:', error);
  //       return Effect.succeed([]);
  //     }),
  //   );
  // }

  private applySorting(query: any, sortOption: SortOption): any {
    switch (sortOption) {
      case 'latest':
        return query.orderBy(desc(product.createdAt));
      case 'price_high':
        return query.orderBy(desc(product.price));
      case 'price_low':
        return query.orderBy(asc(product.price));
      case 'popular':
      default:
        return query.orderBy(desc(product.createdAt));
    }
  }
}
