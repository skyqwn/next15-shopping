import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RefreshTokenSchema = z.object({
  userId: z.string({ message: '유저 아이디가 필요합니다.' }),
});

export class RefreshTokenRequestDto extends createZodDto(RefreshTokenSchema) {}
