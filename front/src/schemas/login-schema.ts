import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, { message: "Password is requried" }),
});

export type LoginType = z.infer<typeof LoginSchema>;
