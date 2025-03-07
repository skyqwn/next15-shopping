import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Effect, pipe } from 'effect';
import { OrderFacade, OrderResponse } from 'src/application/facades';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order/request';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserSelectType } from 'src/infrastructure/drizzle/schema/users.schema';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderFacade: OrderFacade) {}

  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: UserSelectType,
  ) {
    return pipe(
      this.orderFacade.createOrder({ ...createOrderDto, userId: user.id }),
      Effect.map((order) => ({
        success: true,
        result: order,
        message: '주문이 성공적으로 생성되었습니다',
      })),
      Effect.runPromise,
    );
  }

  @Get()
  findAll() {
    return pipe(
      this.orderFacade.findAll(),
      Effect.map((orders) => ({
        success: true,
        result: orders,
        message: orders.length === 0 ? '등록된 주문이 없습니다' : null,
      })),
      Effect.runPromise,
    );
  }

  @Get('/user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return pipe(
      this.orderFacade.findByUserId(parseInt(userId)),
      Effect.map((orders) => ({
        success: true,
        result: orders,
        message: orders.length === 0 ? '사용자의 주문이 없습니다' : null,
      })),
      Effect.runPromise,
    );
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return pipe(
      this.orderFacade.getOrderById(parseInt(id)),
      Effect.map((order) => ({
        success: true,
        result: order,
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Patch(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return pipe(
      this.orderFacade.updateOrder(parseInt(id), updateOrderDto),
      Effect.map((order) => ({
        success: true,
        result: order,
        message: '주문이 성공적으로 업데이트되었습니다',
      })),
      Effect.runPromise,
    );
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return pipe(
      this.orderFacade.deleteOrder(parseInt(id)),
      Effect.map(() => ({
        success: true,
        result: null,
        message: '주문이 성공적으로 삭제되었습니다',
      })),
      Effect.runPromise,
    );
  }
}
