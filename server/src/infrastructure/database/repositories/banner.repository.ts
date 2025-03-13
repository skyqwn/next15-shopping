import { Inject, Injectable } from '@nestjs/common';
import { eq, and, ilike, desc, asc, or, SQL, sql } from 'drizzle-orm';
import { Effect, pipe } from 'effect';

import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import { DrizzleDB } from 'src/infrastructure/drizzle/types/drizzle';

import { BaseRepository } from './base.repository';

import { BannerModel } from 'src/domain/model/banner.model';
import {
  BannerInsertType,
  banners,
} from 'src/infrastructure/drizzle/schema/banner.schema';

@Injectable()
export class BannerRepository
  implements BaseRepository<BannerInsertType, BannerModel>
{
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(data: BannerInsertType): Effect.Effect<BannerModel, Error> {
    return pipe(
      Effect.tryPromise(() => this.db.insert(banners).values(data).returning()),
      Effect.map(([banner]) => BannerModel.from(banner)),
    );
  }

  update(
    id: number,
    data: Partial<BannerInsertType>,
  ): Effect.Effect<BannerModel, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.update(banners).set(data).where(eq(banners.id, id)).returning(),
      ),
      Effect.map(([banner]) => BannerModel.from(banner)),
    );
  }

  delete(id: number): Effect.Effect<void, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.delete(banners).where(eq(banners.id, id)),
      ),
      Effect.map(() => void 0),
    );
  }

  findOneBy(id: number): Effect.Effect<BannerModel | null, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.banners.findFirst({
          where: eq(banners.id, id),
        }),
      ),
      Effect.map((banner) => (banner ? BannerModel.from(banner) : null)),
    );
  }

  getById(id: number): Effect.Effect<BannerModel, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.banners.findFirst({
          where: eq(banners.id, id),
        }),
      ),
      Effect.flatMap((banner) =>
        banner
          ? Effect.succeed(BannerModel.from(banner))
          : Effect.fail(new Error(`Banner with ID ${id} not found`)),
      ),
      Effect.catchAll((error) => {
        console.error(`Error finding banner with ID ${id}:`, error);
        return Effect.fail(error);
      }),
    );
  }

  findAll(): Effect.Effect<BannerModel[], Error> {
    return pipe(
      Effect.tryPromise(() => this.db.query.banners.findMany()),
      Effect.map((banners) => banners.map(BannerModel.from)),
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
    { data: BannerModel[]; total: number; hasMore: boolean },
    Error
  > {
    const page = parseInt(params.page || '1', 10);
    const limit = parseInt(params.limit || '20', 10);
    const skip = (page - 1) * limit;

    return pipe(
      Effect.tryPromise(() =>
        this.db
          .select({ count: sql`count(*)`.mapWith(Number) })
          .from(banners)
          .where(
            params.search
              ? or(ilike(banners.title, `%${params.search}%`))
              : undefined,
          )
          .then((result) => result[0].count),
      ),
      Effect.flatMap((total) =>
        pipe(
          Effect.tryPromise(() =>
            this.db.query.banners.findMany({
              where: params.search
                ? or(ilike(banners.title, `%${params.search}%`))
                : undefined,
              orderBy:
                params.sort === 'latest'
                  ? desc(banners.createdAt)
                  : params.sort === 'oldest'
                    ? asc(banners.createdAt)
                    : desc(banners.createdAt),
              limit,
              offset: skip,
            }),
          ),
          Effect.map((banners) => ({
            data: banners.map(BannerModel.from),
            total,
            hasMore: skip + banners.length < total,
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
