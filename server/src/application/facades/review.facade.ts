import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import { ReviewModel } from 'src/domain/model/review.model';
import { ReviewService } from 'src/domain/service/review.service';
import {
  CreateReviewCriteria,
  UpdateReviewCriteria,
} from '../dtos/criteria/review';

@Injectable()
export class ReviewFacade {
  constructor(private readonly reviewService: ReviewService) {}

  createReview(
    createReviewCriteria: CreateReviewCriteria,
    userId: number,
  ): Effect.Effect<ReviewModel, Error> {
    return this.reviewService.createReview(createReviewCriteria, userId);
  }

  updateReview(
    id: number,
    updateReviewCriteria: UpdateReviewCriteria,
  ): Effect.Effect<ReviewModel, Error> {
    return this.reviewService.updateReview(id, updateReviewCriteria);
  }

  findAll(): Effect.Effect<ReviewModel[], Error> {
    return this.reviewService.findAll();
  }

  getReviewById(productId: number): Effect.Effect<ReviewModel | [], Error> {
    return this.reviewService.getReviewById(productId);
  }

  getReviewsByProductId(
    productId: number,
  ): Effect.Effect<ReviewModel[], Error> {
    return this.reviewService.getReviewsByProductId(productId);
  }

  deleteReview(id: number): Effect.Effect<void, Error> {
    return this.reviewService.deleteReview(id);
  }
}
