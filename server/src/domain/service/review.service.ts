import { Injectable } from '@nestjs/common';
import { pipe, Effect } from 'effect';
import { ReviewRepository } from 'src/infrastructure/database/repositories/review.repository';
import { AppNotFoundException } from '../exceptions';
import { ErrorCodes } from 'src/common/error';
import {
  CreateReviewCommand,
  UpdateReviewCommand,
} from '../dtos/commands/review';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  createReview(createReviewCommand: CreateReviewCommand, userId: number) {
    return this.reviewRepository.create(
      {
        rating: createReviewCommand.rating,
        productId: createReviewCommand.productId,
        comment: createReviewCommand.comment,
      },
      userId,
    );
  }

  updateReview(id: number, updateReviewCommand: UpdateReviewCommand) {
    return pipe(
      this.reviewRepository.update(id, {
        rating: updateReviewCommand.rating,
        comment: updateReviewCommand.comment,
      }),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.REVIEW_NOT_FOUND)),
      ),
    );
  }

  findAll() {
    return this.reviewRepository.findAll();
  }

  getReviewById(productId: number) {
    return pipe(
      this.reviewRepository.findOneBy(productId),
      Effect.map((review) => review ?? []),
    );
  }

  getReviewsByProductId(productId: number) {
    return this.reviewRepository.findByProductId(productId);
  }

  deleteReview(id: number) {
    return pipe(
      this.reviewRepository.delete(id),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.REVIEW_NOT_FOUND)),
      ),
    );
  }
}
