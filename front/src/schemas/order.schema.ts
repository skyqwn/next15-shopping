import * as z from "zod";

const OrderProductSchema = z.object({
  productId: z.number(),
  productVariantId: z.number(),
  quantity: z.number().positive(),
});

export const OrderCreateSchema = z.object({
  totalPrice: z
    .number()
    .positive({ message: "주문 총액은 0보다 커야 합니다." }),
  orderProducts: z
    .array(OrderProductSchema)
    .min(1, { message: "최소 하나 이상의 상품을 주문해야 합니다." }),
  receiptURL: z.string().optional(),
  tossOrderId: z.string().optional(),
});

export const OrderUpdateSchema = z.object({
  status: z
    .enum([
      "pending",
      "processing",
      "shipping",
      "completed",
      "cancelled",
      "refunded",
    ])
    .optional(),
  totalPrice: z.number().positive().optional(),
  receiptURL: z.string().optional(),
  tossOrderId: z.string().optional(),
});

export type OrderCreateType = z.infer<typeof OrderCreateSchema>;
export type OrderUpdateType = z.infer<typeof OrderUpdateSchema>;
