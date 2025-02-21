import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const ProductCategory = {
  SNEAKERS: 'sneakers',
  CLOTHING: 'clothing',
  ACCESSORIES: 'accessories',
  TECH: 'tech',
  LIFE: 'life',
} as const;

export const CreateProductSchema = z.object({
  name: z.string({
    required_error: '상품명은 필수입니다',
  }),
  brand: z.string({
    required_error: '브랜드명은 필수입니다',
  }),
  price: z
    .number({
      required_error: '가격은 필수입니다',
    })
    .min(0, '가격은 0 이상이어야 합니다'),
  immediatePrice: z
    .number({
      required_error: '즉시 구매가는 필수입니다',
    })
    .min(0, '즉시 구매가는 0 이상이어야 합니다'),
  description: z.string().optional(),
  category: z.enum(
    ['sneakers', 'clothing', 'accessories', 'tech', 'life'] as const,
    {
      required_error: '카테고리는 필수입니다',
    },
  ),
  imageUrl: z.string({
    required_error: '이미지 URL은 필수입니다',
  }),
});

export class CreateProductRequestDto extends createZodDto(
  CreateProductSchema,
) {}
