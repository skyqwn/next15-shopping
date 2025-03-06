import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Effect, pipe } from 'effect';

import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import { DrizzleDB } from 'src/infrastructure/drizzle/types/drizzle';
import { AppNotFoundException } from 'src/domain/exceptions';
import { ErrorCodes } from 'src/common/error';

import { BaseRepository } from './base.repository';

import {
  OrderInsertType,
  orders,
  OrderUpdateType,
} from 'src/infrastructure/drizzle/schema/orders.schema';
import { orderProduct } from 'src/infrastructure/drizzle/schema/order-product.schema';
import { OrderModel } from 'src/domain/model/order.model';

@Injectable()
export class OrderRepository
  implements BaseRepository<OrderInsertType, OrderModel>
{
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async createWithOrderProducts(
    orderData: OrderInsertType,
    orderProductsData: {
      productId: number;
      productVariantId: number;
      quantity: number;
    }[],
  ): Promise<OrderModel> {
    return await this.db.transaction(async (tx) => {
      const [newOrder] = await tx.insert(orders).values(orderData).returning();

      const orderProductsWithOrderId = orderProductsData.map((item) => ({
        ...item,
        orderId: newOrder.id,
      }));

      const insertedProducts = await tx
        .insert(orderProduct)
        .values(orderProductsWithOrderId)
        .returning();
      if (!insertedProducts.length) {
        throw new Error('Failed to create order products');
      }

      const orderWithProducts = await tx.query.orders.findFirst({
        where: eq(orders.id, newOrder.id),
        with: {
          orderProduct: true,
        },
      });

      if (!orderWithProducts) {
        throw new AppNotFoundException(ErrorCodes.ORDER_NOT_FOUND);
      }

      return OrderModel.from(orderWithProducts);
    });
  }

  create(data: OrderInsertType): Effect.Effect<OrderModel, Error> {
    return pipe(
      Effect.tryPromise(() => this.db.insert(orders).values(data).returning()),
      Effect.map(([order]) => OrderModel.from(order)),
    );
  }

  update(id: number, data: OrderUpdateType): Effect.Effect<OrderModel, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.update(orders).set(data).where(eq(orders.id, id)).returning(),
      ),
      Effect.map(([order]) => OrderModel.from(order)),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.ORDER_NOT_FOUND)),
      ),
    );
  }

  delete(id: number): Effect.Effect<void, Error> {
    return pipe(
      Effect.tryPromise(() => this.db.delete(orders).where(eq(orders.id, id))),
      Effect.map(() => void 0),
    );
  }

  findOneBy(id: number): Effect.Effect<OrderModel | null, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.orders.findFirst({
          where: eq(orders.id, id),
          with: {
            orderProduct: true,
          },
        }),
      ),
      Effect.map((order) => (order ? OrderModel.from(order) : null)),
    );
  }

  getById(id: number): Effect.Effect<OrderModel, Error> {
    return pipe(
      this.findOneBy(id),
      Effect.flatMap((order) =>
        order
          ? Effect.succeed(order)
          : Effect.fail(new AppNotFoundException(ErrorCodes.ORDER_NOT_FOUND)),
      ),
    );
  }

  findByUserId(userId: number): Effect.Effect<OrderModel[], Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.orders.findMany({
          where: eq(orders.userId, userId),
          with: {
            orderProduct: true,
          },
        }),
      ),
      Effect.map((orders) => orders.map(OrderModel.from)),
      Effect.catchAll((error) => {
        console.error('Query error:', error);
        return Effect.succeed([]);
      }),
    );
  }

  findAll(): Effect.Effect<OrderModel[], Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.orders.findMany({
          with: {
            orderProduct: true,
          },
        }),
      ),
      Effect.map((orders) => orders.map(OrderModel.from)),
      Effect.catchAll((error) => {
        console.error('Query error:', error);
        return Effect.succeed([]);
      }),
    );
  }
}
