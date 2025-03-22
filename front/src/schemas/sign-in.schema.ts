import * as z from "zod";

export const SigninSchema = z.object({
  email: z.string().email({
    message: "이메일 입력을 해주세요",
  }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8글자 이상이어야 합니다" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
      message: "비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다",
    }),
});

export type SigninType = z.infer<typeof SigninSchema>;
