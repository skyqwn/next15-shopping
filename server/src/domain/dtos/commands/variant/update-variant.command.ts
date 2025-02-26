import { CreateVariantCommandProps } from './create-variant.command';

export interface UpdateVariantCommandProps extends CreateVariantCommandProps {
  id: number;
}

export class UpdateVariantCommand {
  readonly id: number;
  readonly productId: number;
  readonly productType: string;
  readonly color: string;
  readonly tags: string[];
  readonly variantImages: Array<{
    url: string;
    size: number;
    fileName: string;
  }>;

  constructor(props: UpdateVariantCommandProps) {
    this.id = props.id;
    this.productId = props.productId;
    this.productType = props.productType;
    this.color = props.color;
    this.tags = props.tags;
    this.variantImages = props.variantImages;
  }
}
