import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const UpdateUserSchema = z.object({
  name: z.string().min(2, { message: '이름은 2글자 이상이어야 합니다.' }),
  profileImageUris: z.string().optional(),
  description: z
    .string()
    .max(100, { message: '최대 100자까지 작성 가능합니다.' })
    .optional(),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
