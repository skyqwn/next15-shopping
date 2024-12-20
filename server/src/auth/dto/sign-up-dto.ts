import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { SigninSchema } from './signin-dto';

const SignupSchema = SigninSchema.extend({
  name: z.string(),
  passwordConfirm: z.string({
    required_error: '비밀번호 확인은 필수입니다',
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['passwordConfirm'],
});

export class SignupDto extends createZodDto(SignupSchema) {}
