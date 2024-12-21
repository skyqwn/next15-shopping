import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const RefreshTokenSchema = z.object({
  userId: z.string().transform((val) => parseInt(val, 10)),
});

export class RefreshTokenDto extends createZodDto(RefreshTokenSchema) {}
