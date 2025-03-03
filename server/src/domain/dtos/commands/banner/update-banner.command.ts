export type UpdateBannerCommandProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

export class UpdateBannerCommand {
  readonly title?: string;
  readonly description?: string;
  readonly imageUrl?: string;

  constructor(props: UpdateBannerCommandProps) {
    this.title = props.title;
    this.description = props.description;
    this.imageUrl = props.imageUrl;
  }
}
