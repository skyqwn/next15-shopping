import {
  ProductSelectType,
  ProductVariantSelectType,
  ReviewSelectType,
  VariantImageSelectType,
  VariantTagSelectType,
} from 'src/infrastructure/drizzle/schema/schema';

type ExtendedProductType = ProductSelectType & {
  reviews?: Array<
    ReviewSelectType & {
      user?: {
        id: number;
        name: string;
        email: string;
      };
    }
  >;
  productVariants?: Array<ProductVariantSelectType>;
};
export class ProductVariantModel {
  readonly id: number;
  readonly productId: number;
  readonly productType: string;
  readonly color: string;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly variantImages?: VariantImageSelectType[];
  readonly variantTags?: VariantTagSelectType[];
  readonly product?: ExtendedProductType;

  constructor(
    props: ProductVariantSelectType & {
      variantImages?: VariantImageSelectType[];
      variantTags?: VariantTagSelectType[];
      product?: ExtendedProductType;
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
    this.product = props.product;
  }

  static from(
    props: ProductVariantSelectType & {
      variantImages?: VariantImageSelectType[];
      variantTags?: VariantTagSelectType[];
      product?: ExtendedProductType;
    },
  ): ProductVariantModel {
    return new ProductVariantModel(props);
  }
}
