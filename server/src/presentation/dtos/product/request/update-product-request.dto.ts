import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { createProductSchema } from './create-product-request.dto';

export const UpdateProductSchema = createProductSchema.partial();

export class UpdateProductRequestDto extends createZodDto(
  UpdateProductSchema,
) {}
