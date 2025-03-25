import { UserProfileType } from "@/hooks/queries/userInfo/useUserInfo";

export interface ProductVariantImageType {
  id: number;
  url: string;
  size: number;
  fileName: string;
  blurThumb: string | undefined;
  order: number;
}

export interface ProductVariantTagType {
  id: number;
  tag: string;
  variantId: number;
}

export interface ProductVariantType {
  id: number;
  productId: number;
  color: string;
  productType: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  variantImages: ProductVariantImageType[] | [];
  variantTags: ProductVariantTagType[] | [];
  product: BaseProductType;
}

export interface GetProductResponseType {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
  productVariants: ProductVariantType[] | [];
}

export interface ReviewType {
  id: number;
  rating: number;
  userId: number;
  productId: number;
  comment: string;
  createdAt: string | null;
  updatedAt: string | null;
  user: UserProfileType;
}

export interface BaseProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
  productVariants: ProductVariantType[] | [];
  reviews: ReviewType[] | [];
}
