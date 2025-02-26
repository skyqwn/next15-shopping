import { CreateVariantSchema } from './create-variant-request.dto';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const UpdateVariantSchema = CreateVariantSchema.extend({
  id: z.number(),
});

export class UpdateVariantRequestDto extends createZodDto(
  UpdateVariantSchema,
) {}
