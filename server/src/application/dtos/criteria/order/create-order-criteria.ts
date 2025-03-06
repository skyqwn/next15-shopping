import { OrderStatusEnumType } from 'src/domain/types/order.types';

export type OrderProductCriteria = {
  productId: number;
  productVariantId: number;
  quantity: number;
};

export type CreateOrderCriteria = {
  userId: number;
  totalPrice: number;
  status?: OrderStatusEnumType;
  orderProducts: OrderProductCriteria[];
  receiptURL?: string;
  tossOrderId?: string;
};
