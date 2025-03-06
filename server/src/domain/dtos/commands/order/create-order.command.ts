import { OrderStatusEnumType } from 'src/domain/types/order.types';

export type OrderProductCommandProps = {
  productId: number;
  productVariantId: number;
  quantity: number;
};

export type CreateOrderCommandProps = {
  userId: number;
  totalPrice: number;
  status?: OrderStatusEnumType;
  orderProducts: OrderProductCommandProps[];
  receiptURL?: string;
  tossOrderId?: string;
};

export class CreateOrderCommand {
  readonly userId: number;
  readonly totalPrice: number;
  readonly status?: OrderStatusEnumType;
  readonly orderProducts: OrderProductCommandProps[];
  readonly receiptURL?: string;
  readonly tossOrderId?: string;

  constructor(props: CreateOrderCommandProps) {
    this.userId = props.userId;
    this.totalPrice = props.totalPrice;
    this.status = props.status;
    this.orderProducts = props.orderProducts;
    this.receiptURL = props.receiptURL;
    this.tossOrderId = props.tossOrderId;
  }
}
