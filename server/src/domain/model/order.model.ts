import { OrderSelectType } from 'src/infrastructure/drizzle/schema/orders.schema';
import { OrderProductSelectType } from 'src/infrastructure/drizzle/schema/order-product.schema';
import { OrderStatusEnumType } from '../types/order.types';

export class OrderModel {
  constructor(
    public id: number,
    public userId: number,
    public totalPrice: number,
    public status: OrderStatusEnumType,
    public receiptURL: string | null,
    public tossOrderId: string | null,
    public createdAt: Date | null,
    public updatedAt: Date | null,
    public orderProducts: {
      id: number;
      quantity: number;
      productVariantId: number;
      productId: number;
      orderId: number;
      createdAt: Date | null;
      updatedAt: Date | null;
    }[] = [],
  ) {}

  static from(
    data: OrderSelectType & {
      orderProduct?: OrderProductSelectType[];
    },
  ): OrderModel {
    return new OrderModel(
      data.id,
      data.userId,
      data.totalPrice,
      data.status as OrderStatusEnumType,
      data.receiptURL || null,
      data.tossOrderId || null,
      data.createdAt,
      data.updatedAt,
      data.orderProduct?.map((orderProduct) => ({
        id: orderProduct.id,
        quantity: orderProduct.quantity,
        productVariantId: orderProduct.productVariantId,
        productId: orderProduct.productId,
        orderId: orderProduct.orderId,
        createdAt: orderProduct.createdAt,
        updatedAt: orderProduct.updatedAt,
      })) || [],
    );
  }
}
