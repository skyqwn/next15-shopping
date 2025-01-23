export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const END_POINTS = {
  USER_PROFILE: `/user/me`,
  CHECK_ISADMIN: `/user/checkIsAdmin`,

  CREATE_PRODUCT: `/products/create`,
  PRODUCTS: `/products`,
  DELETE_PRODUCT: (id: number) => `/products/${id}`,
  PRODUCT_DETAIL: (id: number) => `/products/${id}`,
  PATCH_PRODUCT: (id: number) => `/products/${id}`,
} as const;
