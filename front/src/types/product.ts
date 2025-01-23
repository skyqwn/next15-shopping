export interface GetProductVariantResponseType {
  id: number;
  name: string;
  price: number;
}

export interface GetProductResponseType {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  productVariants: GetProductVariantResponseType[];
}
