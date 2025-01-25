import * as z from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
  profileImageUris: z.string().optional(),
  description: z
    .string()
    .max(100, { message: "최대 100자까지 작성 가능합니다." }),
});

export type ProfileType = z.infer<typeof ProfileSchema>;
