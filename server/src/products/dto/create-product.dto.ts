import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const createProductSchema = z.object({
  productName: z.string(),
  brandName: z.string(),
  description: z.string(),
  price: z.number(),
  imageUris: z.array(z.string()).optional(),
});

export class CreateProductDto extends createZodDto(createProductSchema) {}
