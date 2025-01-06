import * as z from "zod";

export const SigninSchema = z.object({
  email: z.string().email({
    message: "이메일 입력을 해주세요",
  }),
  password: z.string().min(8, { message: "비밀번호를 입력해주세요" }),
});

export type SigninType = z.infer<typeof SigninSchema>;
