import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createBannerSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
});
const patchBannerSchema = createBannerSchema.partial();

export class CreateBannerDto extends createZodDto(createBannerSchema) {}
export class PatchBannerDto extends createZodDto(patchBannerSchema) {}
