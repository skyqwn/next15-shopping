import { ReviewSelectType } from 'src/infrastructure/drizzle/schema/review.schema';

export class ReviewModel {
  constructor(
    public id: number,
    public rating: number,
    public userId: number,
    public productId: number,
    public comment: string,
    public createdAt: Date | null,
    public updatedAt: Date | null,
    public user?: {
      id: number;
      name: string;
    },
    public product?: {
      id: number;
      title: string;
    },
  ) {}

  static from(
    data: ReviewSelectType & {
      user?: { id: number; name: string };
      product?: { id: number; title: string };
    },
  ): ReviewModel {
    return new ReviewModel(
      data.id,
      data.rating,
      data.userId,
      data.productId,
      data.comment,
      data.createdAt,
      data.updatedAt,
      data.user,
      data.product,
    );
  }
}
