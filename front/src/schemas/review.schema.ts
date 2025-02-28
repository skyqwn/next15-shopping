import * as z from "zod";

export const ReviewsSchema = z.object({
  productId: z.number({ message: "상품 아이디를 입력해주세요." }),
  rating: z
    .number()
    .min(1, { message: "1점 이상은 입력해야합니다" })
    .max(5, { message: "5점을 초과할 순 없습니다." }),
  comment: z
    .string()
    .min(10, { message: "10글자 글을 작성해주시길 바랍니다." }),
});

export type ReviewType = z.infer<typeof ReviewsSchema>;
