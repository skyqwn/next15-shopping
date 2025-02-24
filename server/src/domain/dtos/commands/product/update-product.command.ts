import { CreateProductCommandProps } from './create-product.command';

export type UpdateProductCommandProps = Partial<CreateProductCommandProps>;

export class UpdateProductCommand {
  readonly title?: string;
  readonly price?: number;
  readonly description?: string;

  constructor(props: UpdateProductCommandProps) {
    Object.assign(this, props);
  }
}
