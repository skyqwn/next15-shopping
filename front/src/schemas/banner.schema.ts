import * as z from "zod";

export const BannerSchema = z.object({
  imageUrl: z.string({ message: "이미지 주소를 입력해주세요." }),
  title: z.string({ message: "제목을 입력해주세요." }),
  description: z.string({ message: "설명을 입력해주세요." }),
});

export type BannerType = z.infer<typeof BannerSchema>;
