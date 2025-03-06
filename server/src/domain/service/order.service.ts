import { Injectable } from '@nestjs/common';
import { pipe, Effect } from 'effect';

import { OrderRepository } from 'src/infrastructure/database/repositories/order.repository';
import { AppNotFoundException } from '../exceptions';
import { ErrorCodes } from 'src/common/error';
import { CreateOrderCommand, UpdateOrderCommand } from '../dtos/commands/order';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  createOrder(createOrderCommand: CreateOrderCommand) {
    return pipe(
      Effect.tryPromise(() =>
        this.orderRepository.createWithOrderProducts(
          {
            userId: createOrderCommand.userId,
            totalPrice: createOrderCommand.totalPrice,
            status: 'pending',
            receiptURL: createOrderCommand.receiptURL,
            tossOrderId: createOrderCommand.tossOrderId,
          },
          createOrderCommand.orderProducts,
        ),
      ),
      Effect.map((order) => order),
      Effect.catchAll((error) => {
        console.error('Order creation error:', error);
        return Effect.fail(new Error('Failed to create order'));
      }),
    );
  }

  updateOrder(id: number, updateOrderCommand: UpdateOrderCommand) {
    return pipe(
      this.orderRepository.update(id, {
        status: updateOrderCommand.status,
        totalPrice: updateOrderCommand.totalPrice,
        receiptURL: updateOrderCommand.receiptURL,
        tossOrderId: updateOrderCommand.tossOrderId,
        updatedAt: new Date(),
      }),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.ORDER_NOT_FOUND)),
      ),
    );
  }

  findAll() {
    return this.orderRepository.findAll();
  }

  findByUserId(userId: number) {
    return this.orderRepository.findByUserId(userId);
  }

  //   getOrders(params: {
  //     search?: string;
  //     status?: string;
  //     userId?: string;
  //     sort?: string;
  //     page?: string;
  //     limit?: string;
  //   }) {
  //     return this.orderRepository.findAllWithFilters(params);
  //   }

  getOrderById(id: number) {
    return pipe(
      this.orderRepository.findOneBy(id),
      Effect.flatMap((order) =>
        order
          ? Effect.succeed(order)
          : Effect.fail(new AppNotFoundException(ErrorCodes.ORDER_NOT_FOUND)),
      ),
    );
  }

  deleteOrder(id: number) {
    return pipe(
      this.orderRepository.delete(id),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.ORDER_NOT_FOUND)),
      ),
    );
  }
}
