import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const RegisterSchema = z.object({
  email: z
    .string({
      required_error: '이메일은 필수입니다',
      invalid_type_error: '이메일 형식이 올바르지 않습니다',
    })
    .email({ message: '올바른 이메일 형식이 아닙니다' }),
  password: z
    .string({
      required_error: '비밀번호는 필수입니다',
    })
    .min(10, {
      message: '비밀번호는 최소 10자 이상이어야 합니다',
    })
    .regex(/[0-9]/, { message: '숫자를 포함해야 합니다' })
    .regex(/[A-Z]/, { message: '대문자를 포함해야 합니다' }),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
