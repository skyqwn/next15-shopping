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
  FILTER_VARIANTS: `/products/variant/filter`,
  VARIANT_DETAIL: (id: number) => `/products/variant/${id}`,
  UPDATE_VARIANT: (id: number) => `/products/variant/${id}`,
  DELETE_VARIANT: (id: number) => `/products/variant/${id}`,

  REVIEW_PRODUCT: (productId: number) => `/reviews/${productId}`,
  CREATE_REVIEW: `/reviews`,
  UPDATE_REVIEW: (reviewId: number) => `/reviews/${reviewId}`,
  DELETE_REVIEW: (reviewId: number) => `/reviews/${reviewId}`,

  CREATE_BANNER: "/banners",
  UPDATE_BANNER: (id: number | string) => `/banners/${id}`,
  GET_BANNERS: "/banners",
  GET_BANNER: (id: number | string) => `/banners/${id}`,
  DELETE_BANNER: (id: number | string) => `/banners/${id}`,

  CREATE_ORDER: "/orders",
  GET_ORDERS: "/orders",
  GET_ORDER: (id: number) => `/orders/${id}`,
  GET_USER_ORDERS: (userId: number) => `/orders/user/${userId}`,
  UPDATE_ORDER: (id: number) => `/orders/${id}`,
  DELETE_ORDER: (id: number) => `/orders/${id}`,

  GET_ORDER_PRODUCTS: "/orders/products",

  VIEWED_PRODUCT: "/products/viewed",
  VIEWED_PRODUCTS: "/products/viewed",
} as const;
