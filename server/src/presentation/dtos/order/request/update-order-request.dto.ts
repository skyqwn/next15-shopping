import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { orderSatus } from 'src/infrastructure/drizzle/schema/orders.schema';

const orderStatusValues = orderSatus.enumValues;

export const updateOrderSchema = z.object({
  status: z.enum(orderStatusValues),
  totalPrice: z.number().min(0).optional(),
  receiptURL: z.string().optional(),
  tossOrderId: z.string().optional(),
});

export class UpdateOrderDto extends createZodDto(updateOrderSchema) {}
