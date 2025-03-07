export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type VariantImageType = {
  id: number;
  url: string;
  productVariantId: number;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type ProductVariantType = {
  id: number;
  color: string;
  productType: string;
  productId: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  variantImages: VariantImageType[];
};

export type OrderProductType = {
  id: number;
  quantity: number;
  productVariantId: number;
  productId: number;
  orderId: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  product?: ProductType;
  productVariants?: ProductVariantType;
};

export type OrderType = {
  id: number;
  userId: number;
  totalPrice: number;
  status: "pending" | "shipping" | "completed" | "cancelled" | "refunded";
  receiptURL: string | null;
  tossOrderId: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  orderProducts: OrderProductType[];
};
