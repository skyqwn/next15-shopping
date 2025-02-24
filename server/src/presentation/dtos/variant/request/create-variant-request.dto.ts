import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const VariantImageSchema = z.object({
  url: z.string().url(),
  size: z.number(),
  fileName: z.string(),
});

export const CreateVariantSchema = z.object({
  productId: z.number(),
  productType: z.string(),
  color: z.string(),
  tags: z.array(z.string()),
  variantImages: z.array(VariantImageSchema),
});

export class CreateVariantRequestDto extends createZodDto(
  CreateVariantSchema,
) {}
