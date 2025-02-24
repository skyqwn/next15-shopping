import { ProductSelectType } from 'src/infrastructure/drizzle/schema/products.schema';

export class ProductModel {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: number,
    public createdAt: Date | null,
    public updatedAt: Date | null,
    public isDeleted: boolean,
    public productVariants: {
      id: number;
      color: string;
      productType: string;
      createdAt: Date | null;
      updatedAt: Date | null;
      variantImages: {
        id: number;
        url: string;
        size: number;
        fileName: string;
        order: number;
      }[];
    }[] = [],
  ) {}

  static from(
    data: ProductSelectType & {
      productVariants?: {
        id: number;
        color: string;
        productType: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        variantImages?: {
          id: number;
          url: string;
          size: number;
          fileName: string;
          order: number;
        }[];
      }[];
    },
  ): ProductModel {
    return new ProductModel(
      data.id,
      data.title,
      data.description,
      data.price,
      data.createdAt,
      data.updatedAt,
      data.isDeleted,
      data.productVariants?.map((variant) => ({
        id: variant.id,
        color: variant.color,
        productType: variant.productType,
        createdAt: variant.createdAt,
        updatedAt: variant.updatedAt,
        variantImages: variant.variantImages || [],
      })) || [],
    );
  }
}
