import * as z from "zod";

export const ProductSchema = z.object({
  title: z
    .string()
    .min(2, { message: "상품 이름은 최소 2글자 입력해야합니다." })
    .max(16, { message: "상품 이름은 최대 16자까지 가능합니다." }),
  description: z
    .string()
    .min(40, { message: "상품 설명은 최소 40자 이상 입력해야합니다." }),
  price: z.coerce
    .number({ invalid_type_error: "가격은 숫자타입으로 입력해야 합니다." })
    .positive({ message: "가격은 0보다 커야합니다." }),
});

export const PartialProductSchema = ProductSchema.partial();

export type ProductType = z.infer<typeof ProductSchema>;
export type PartialProductType = z.infer<typeof PartialProductSchema>;
