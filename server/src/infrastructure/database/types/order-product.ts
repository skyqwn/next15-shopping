export interface OrderProductWithDetails {
  id: number;
  quantity: number;
  productVariantId: number;
  productId: number;
  orderId: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  order: {
    id: number;
    userId: number;
    totalPrice: number;
    status: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
  };
  productVariants: {
    id: number;
    color: string;
    productType: string;

    variantImages: {
      id: number;
      url: string;
    }[];
  };
}
