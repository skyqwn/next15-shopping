export type CreateReviewCommandProps = {
  rating: number;
  productId: number;
  comment: string;
};

export class CreateReviewCommand {
  readonly rating: number;
  readonly productId: number;
  readonly comment: string;

  constructor(props: CreateReviewCommandProps) {
    this.rating = props.rating;
    this.productId = props.productId;
    this.comment = props.comment;
  }
}
