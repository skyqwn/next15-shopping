import { ProductSelectType } from 'src/infrastructure/drizzle/schema/product.schema';

export class ProductModel {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly brand: string,
    public readonly price: number,
    public readonly immediatePrice: number,
    public readonly description: string | null,
    public readonly category: string,
    public readonly imageUrl: string,
    public readonly createdAt: Date | null,
    public readonly updatedAt: Date | null,
    public readonly deletedAt: Date | null,
  ) {}

  static from(product: ProductSelectType): ProductModel {
    return new ProductModel(
      product.id,
      product.name,
      product.brand,
      product.price,
      product.immediatePrice,
      product.description,
      product.category,
      product.imageUrl,
      product.createdAt,
      product.updatedAt,
      product.deletedAt,
    );
  }
}
