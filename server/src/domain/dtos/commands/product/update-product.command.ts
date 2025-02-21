import { CreateProductCommandProps } from './create-product.command';

export type UpdateProductCommandProps = Partial<CreateProductCommandProps>;

export class UpdateProductCommand {
  readonly name?: string;
  readonly brand?: string;
  readonly price?: number;
  readonly immediatePrice?: number;
  readonly description?: string;
  readonly category?: 'sneakers' | 'clothing' | 'accessories' | 'tech' | 'life';
  readonly imageUrl?: string;

  constructor(props: UpdateProductCommandProps) {
    Object.assign(this, props);
  }
}
