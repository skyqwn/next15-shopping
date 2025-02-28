import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Effect, pipe } from 'effect';
import { ReviewFacade } from 'src/application/facades/review.facade';
import { IsPublic } from 'src/common/decorators/is-public.decorator';
import { CreateReviewDto, UpdateReviewDto } from '../dtos/review/request';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserModel } from 'src/domain/model/user.model';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewFacade: ReviewFacade) {}

  @Get()
  @IsPublic()
  findAll() {
    return pipe(
      this.reviewFacade.findAll(),
      Effect.map((reviews) => ({
        success: true,
        result: reviews,
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Post()
  createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: UserModel,
  ) {
    return pipe(
      this.reviewFacade.createReview(createReviewDto, user.id),
      Effect.map((review) => ({
        success: true,
        result: review,
        message: '리뷰가 성공적으로 작성되었습니다',
      })),
      Effect.runPromise,
    );
  }

  //   @IsPublic()
  //   @Get(':id')
  //   getReview(@Param('id') productId: string) {
  //     return pipe(
  //       this.reviewFacade.getReviewById(parseInt(productId)),
  //       Effect.map((review) => ({
  //         success: true,
  //         result: review ?? [],
  //         message: null,
  //       })),
  //       Effect.runPromise,
  //     );
  //   }

  @IsPublic()
  @Get(':id')
  getReviewsByProduct(@Param('id') productId: string) {
    return pipe(
      this.reviewFacade.getReviewsByProductId(parseInt(productId)),
      Effect.map((reviews) => ({
        success: true,
        result: reviews ?? [],
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Patch(':id')
  updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return pipe(
      this.reviewFacade.updateReview(parseInt(id), updateReviewDto),
      Effect.map((review) => ({
        success: true,
        result: review,
        message: '리뷰가 성공적으로 수정되었습니다',
      })),
      Effect.runPromise,
    );
  }

  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return pipe(
      this.reviewFacade.deleteReview(parseInt(id)),
      Effect.map(() => ({
        success: true,
        result: null,
        message: '리뷰가 성공적으로 삭제되었습니다',
      })),
      Effect.runPromise,
    );
  }
}
