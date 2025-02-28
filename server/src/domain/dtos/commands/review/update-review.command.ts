export type UpdateReviewCommandProps = {
  rating?: number;
  comment?: string;
};

export class UpdateReviewCommand {
  readonly rating?: number;
  readonly comment?: string;

  constructor(props: UpdateReviewCommandProps) {
    this.rating = props.rating;
    this.comment = props.comment;
  }
}
