export type CreateProductCommandProps = {
  title: string;
  description: string;
  price: number;
};

export class CreateProductCommand {
  readonly title: string;
  readonly description: string;
  readonly price: number;

  constructor(props: CreateProductCommandProps) {
    this.title = props.title;
    this.description = props.description;
    this.price = props.price;
  }
}
