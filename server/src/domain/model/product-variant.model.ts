import {
  ProductVariantSelectType,
  VariantImageSelectType,
  VariantTagSelectType,
} from 'src/infrastructure/drizzle/schema/schema';

export class ProductVariantModel {
  readonly id: number;
  readonly productId: number;
  readonly productType: string;
  readonly color: string;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly variantImages?: VariantImageSelectType[];
  readonly variantTags?: VariantTagSelectType[];

  constructor(
    props: ProductVariantSelectType & {
      variantImages?: VariantImageSelectType[];
      variantTags?: VariantTagSelectType[];
    },
  ) {
    this.id = props.id;
    this.productId = props.productId;
    this.productType = props.productType;
    this.color = props.color;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.variantImages = props.variantImages;
    this.variantTags = props.variantTags;
  }

  static from(
    props: ProductVariantSelectType & {
      variantImages?: VariantImageSelectType[];
      variantTags?: VariantTagSelectType[];
    },
  ): ProductVariantModel {
    return new ProductVariantModel(props);
  }
}
