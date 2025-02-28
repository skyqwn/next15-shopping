export type CreateReviewCommandProps = {
  rating: number;
  //   userId: number;
  productId: number;
  comment: string;
};

export class CreateReviewCommand {
  readonly rating: number;
  //   readonly userId: number;
  readonly productId: number;
  readonly comment: string;

  constructor(props: CreateReviewCommandProps) {
    this.rating = props.rating;
    // this.userId = props.userId;
    this.productId = props.productId;
    this.comment = props.comment;
  }
}
