import { OrderStatusEnumType } from 'src/domain/types/order.types';

export type UpdateOrderCriteria = {
  status: OrderStatusEnumType;
  totalPrice?: number;
  receiptURL?: string;
  tossOrderId?: string;
};
