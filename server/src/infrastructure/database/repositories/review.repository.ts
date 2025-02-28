import { Inject, Injectable } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { Effect, pipe } from 'effect';
import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import { DrizzleDB } from 'src/infrastructure/drizzle/types/drizzle';
import { BaseRepository } from './base.repository';
import { ReviewModel } from 'src/domain/model/review.model';
import {
  ReviewInsertType,
  reviews,
  ReviewUpdateType,
} from 'src/infrastructure/drizzle/schema/review.schema';
import { AppNotFoundException } from 'src/domain/exceptions';
import { ErrorCodes } from 'src/common/error';

@Injectable()
export class ReviewRepository
  implements BaseRepository<ReviewInsertType, ReviewModel>
{
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(
    data: ReviewInsertType,
    userId: number,
  ): Effect.Effect<ReviewModel, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db
          .insert(reviews)
          .values({ ...data, userId })
          .returning(),
      ),
      Effect.map(([review]) => ReviewModel.from(review)),
    );
  }

  update(
    id: number,
    data: ReviewUpdateType,
  ): Effect.Effect<ReviewModel, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db
          .update(reviews)
          .set({ ...data, updatedAt: new Date() })
          .where(eq(reviews.id, id))
          .returning(),
      ),
      Effect.map(([review]) => ReviewModel.from(review)),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.REVIEW_NOT_FOUND)),
      ),
    );
  }

  delete(id: number): Effect.Effect<void, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.delete(reviews).where(eq(reviews.id, id)),
      ),
      Effect.map(() => void 0),
    );
  }

  findOneBy(productId: number): Effect.Effect<ReviewModel | [], Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.reviews.findFirst({
          where: eq(reviews.productId, productId),
          with: {
            user: true,
            product: true,
          },
        }),
      ),
      Effect.map((review) => (review ? ReviewModel.from(review) : [])),
    );
  }

  getById(id: number): Effect.Effect<ReviewModel | [], Error> {
    return pipe(
      this.findOneBy(id),
      Effect.flatMap((review) =>
        review
          ? Effect.succeed(review)
          : Effect.fail(new AppNotFoundException(ErrorCodes.REVIEW_NOT_FOUND)),
      ),
    );
  }

  findAll(): Effect.Effect<ReviewModel[], Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.reviews.findMany({
          with: {
            user: true,
            product: true,
          },
          orderBy: desc(reviews.createdAt),
        }),
      ),
      Effect.map((reviews) => reviews.map(ReviewModel.from)),
      Effect.catchAll((error) => {
        console.error('Query error:', error);
        return Effect.succeed([]);
      }),
    );
  }

  findByProductId(productId: number): Effect.Effect<ReviewModel[], Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.reviews.findMany({
          where: eq(reviews.productId, productId),
          with: {
            user: true,
            product: true,
          },
          orderBy: desc(reviews.createdAt),
        }),
      ),
      Effect.map((reviews) => reviews.map(ReviewModel.from)),
    );
  }
}
