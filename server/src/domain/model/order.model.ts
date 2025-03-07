import { OrderSelectType } from 'src/infrastructure/drizzle/schema/orders.schema';
import { OrderProductSelectType } from 'src/infrastructure/drizzle/schema/order-product.schema';
import { OrderStatusEnumType } from '../types/order.types';
import {
  ProductSelectType,
  ProductVariantSelectType,
  VariantImageSelectType,
} from 'src/infrastructure/drizzle/schema/schema';

type ExtendedOrderProduct = {
  id: number;
  quantity: number;
  productVariantId: number;
  productId: number;
  orderId: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  product?: ProductSelectType;
  productVariants?: ProductVariantSelectType & {
    variantImages?: VariantImageSelectType[];
  };
};

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
    public orderProducts: ExtendedOrderProduct[] = [],
  ) {}

  static from(
    data: OrderSelectType & {
      orderProduct?: (OrderProductSelectType & {
        product?: ProductSelectType;
        productVariants?: ProductVariantSelectType & {
          variantImages?: VariantImageSelectType[];
        };
      })[];
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
        product: orderProduct.product,
        productVariants: orderProduct.productVariants,
      })) || [],
    );
  }
}
