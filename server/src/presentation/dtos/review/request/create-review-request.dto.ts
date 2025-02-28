import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createReviewSchema = z.object({
  productId: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
});

export class CreateReviewDto extends createZodDto(createReviewSchema) {}
