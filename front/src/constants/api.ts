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
} as const;
