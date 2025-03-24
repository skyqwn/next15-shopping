export type VariantImageCriteria = {
  url: string;
  size: number;
  fileName: string;
  blurThumb?: string;
};

export type CreateVariantCriteria = {
  productId: number;
  productType: string;
  color: string;
  tags: string[];
  variantImages: VariantImageCriteria[];
};
