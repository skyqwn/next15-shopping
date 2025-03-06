import { orderSatus } from 'src/infrastructure/drizzle/schema/orders.schema';

export type OrderStatusEnumType = (typeof orderSatus.enumValues)[number];
