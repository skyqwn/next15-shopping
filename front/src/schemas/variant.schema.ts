import * as z from "zod";

export const VariantSchema = z.object({
  productId: z.number(),
  id: z.number(),
  // editMode: z.boolean(),
  productType: z
    .string()
    .min(3, { message: "상품타입을 최소 3자 입력해주세요" }),
  color: z.string().min(3, { message: "색상을 최소 3자 입력해주세요" }),
  tags: z
    .array(z.string())
    .min(1, { message: "태그를 최소 1개 이상 입력해주세요" }),
  variantImages: z.array(
    z.object({
      url: z.string(),
      size: z.number(),
      fileName: z.string(),
    }),
  ),
});

export type VariantType = z.infer<typeof VariantSchema>;
