import { z } from "zod";
import { LoginSchema } from "./login-schema";

export const SignupSchema = LoginSchema.extend({
  name: z.string(),
  passwordConfirm: z.string({
    required_error: "비밀번호 확인은 필수입니다",
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["passwordConfirm"],
});

export type SignupType = z.infer<typeof SignupSchema>;
