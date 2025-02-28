import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().min(1).optional(),
});

export class UpdateReviewDto extends createZodDto(updateReviewSchema) {}
