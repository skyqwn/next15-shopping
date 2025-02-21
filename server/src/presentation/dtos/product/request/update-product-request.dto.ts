import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { CreateProductSchema } from './create-product-request.dto';

export const UpdateProductSchema = CreateProductSchema.partial();

export class UpdateProductRequestDto extends createZodDto(
  UpdateProductSchema,
) {}
