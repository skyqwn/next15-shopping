// 사용자 정보를 위한 인터페이스
export interface User {
  id: number;
  email: string;
  password: string;
  loginType: string;
  role: string;
  name: string;
  description: string;
  isVerified: boolean;
  imageUri: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface VariantImage {
  id: number;
  url: string;
  size: number;
  fileName: string;
  order: number;
  variantId: number;
}

export interface ProductVariant {
  id: number;
  color: string;
  productType: string;
  createdAt: string;
  updatedAt: string;
  productId: number;
  variantImages: VariantImage[];
}

export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  shippingAddress: string | null;
  status: "pending" | "shipping" | "completed" | "cancelled" | "refunded";
  receiptURL: string | null;
  tossOrderId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface OrderProduct {
  id: number;
  quantity: number;
  productVariantId: number;
  productId: number;
  orderId: number;
  createdAt: string;
  updatedAt: string;
  order: Order;
  product: Product;
  productVariants: ProductVariant;
}
