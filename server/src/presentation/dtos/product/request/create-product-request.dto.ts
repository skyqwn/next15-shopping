import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce
    .number({ invalid_type_error: '가격은 숫자타입으로 입력해야 합니다.' })
    .positive({ message: '가격은 0보다 커야합니다.' }),
});
const patchProductSchema = createProductSchema.partial();

export class CreateProductDto extends createZodDto(createProductSchema) {}
export class PatchProductDto extends createZodDto(patchProductSchema) {}
