import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { orderSatus } from 'src/infrastructure/drizzle/schema/orders.schema';

const orderStatusValues = orderSatus.enumValues;

const orderProductSchema = z.object({
  productId: z.number(),
  productVariantId: z.number(),
  quantity: z.number().min(1),
});

export const createOrderSchema = z.object({
  totalPrice: z.number().min(0),
  status: z.enum(orderStatusValues).optional().default('pending'),
  orderProducts: z.array(orderProductSchema),
  receiptURL: z.string().optional(),
  tossOrderId: z.string().optional(),
});

export class CreateOrderDto extends createZodDto(createOrderSchema) {}
