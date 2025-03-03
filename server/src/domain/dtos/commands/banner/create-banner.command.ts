export type CreateBannerCommandProps = {
  title: string;
  description: string;
  imageUrl: string;
};

export class CreateBannerCommand {
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;

  constructor(props: CreateBannerCommandProps) {
    this.title = props.title;
    this.description = props.description;
    this.imageUrl = props.imageUrl;
  }
}
