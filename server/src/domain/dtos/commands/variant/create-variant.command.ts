export type CreateVariantCommandProps = {
  productId: number;
  productType: string;
  color: string;
  tags: string[];
  variantImages: Array<{
    url: string;
    size: number;
    fileName: string;
    blurThumb?: string;
  }>;
};

export class CreateVariantCommand {
  readonly productId: number;
  readonly productType: string;
  readonly color: string;
  readonly tags: string[];
  readonly variantImages: Array<{
    url: string;
    size: number;
    fileName: string;
    blurThumb?: string;
  }>;

  constructor(props: CreateVariantCommandProps) {
    this.productId = props.productId;
    this.productType = props.productType;
    this.color = props.color;
    this.tags = props.tags;
    this.variantImages = props.variantImages;
  }
}
