export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const END_POINTS = {
  USER_PROFILE: `/auth/me`,
  AUTH_STATUS: `/auth/status`,
  CHECK_ISADMIN: `/user/checkIsAdmin`,
  USER_PROFILE_UPDATE: `/auth/me/profile`,
  IMAGES_UPLOAD: "/images",

  CREATE_PRODUCT: `/products`,
  PRODUCTS: `/products`,
  FILTER_PRODUCTS: `/products/filter`,
  DELETE_PRODUCT: (id: number) => `/products/${id}`,
  PRODUCT_DETAIL: (id: number) => `/products/${id}`,
  PATCH_PRODUCT: (id: number) => `/products/${id}`,

  CREATE_VARIANT: `/products/variant`,
  GET_VARIANTS: `/products/variant`,
  VARIANT_DETAIL: (id: number) => `/products/variant/${id}`,
  UPDATE_VARIANT: (id: number) => `/products/variant/${id}`,
  DELETE_VARIANT: (id: number) => `/products/variant/${id}`,

  REVIEW_PRODUCT: (productId: number) => `/reviews/${productId}`,
  CREATE_REVIEW: `/reviews`,
  UPDATE_REVIEW: (reviewId: number) => `/reviews/${reviewId}`,
  DELETE_REVIEW: (reviewId: number) => `/reviews/${reviewId}`,
} as const;
