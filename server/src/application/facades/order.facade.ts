import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import { OrderService } from 'src/domain/service/order.service';
import {
  CreateOrderCriteria,
  UpdateOrderCriteria,
} from '../dtos/criteria/order';
import { OrderModel } from 'src/domain/model/order.model';

export interface OrderResponse {
  data: OrderModel[];
  total: number;
  hasMore: boolean;
}

@Injectable()
export class OrderFacade {
  constructor(private readonly orderService: OrderService) {}

  createOrder(
    createOrderCriteria: CreateOrderCriteria,
  ): Effect.Effect<OrderModel, Error> {
    return this.orderService.createOrder(createOrderCriteria);
  }

  updateOrder(
    id: number,
    updateOrderCriteria: UpdateOrderCriteria,
  ): Effect.Effect<OrderModel, Error> {
    return this.orderService.updateOrder(id, updateOrderCriteria);
  }

  findAll(): Effect.Effect<OrderModel[], Error> {
    return this.orderService.findAll();
  }

  findByUserId(userId: number): Effect.Effect<OrderModel[], Error> {
    return this.orderService.findByUserId(userId);
  }

  getOrderById(id: number): Effect.Effect<OrderModel, Error> {
    return this.orderService.getOrderById(id);
  }

  deleteOrder(id: number): Effect.Effect<void, Error> {
    return this.orderService.deleteOrder(id);
  }

  findManyOrderProducts(): Effect.Effect<any[], Error> {
    return this.orderService.findManyOrderProducts();
  }
}
