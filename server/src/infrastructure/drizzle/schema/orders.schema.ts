import {
  integer,
  pgEnum,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { relations } from 'drizzle-orm';
import { orderProduct } from './order-product.schema';

export const orderSatus = pgEnum('orders_status', [
  'pending',
  'shipping',
  'completed',
  'cancelled',
  'refunded',
]);

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  totalPrice: real('totalPrice').notNull(),
  shippingAddress: text('shippingAddress'),
  status: orderSatus('status').notNull(),
  receiptURL: text('receiptURL'),
  tossOrderId: text('tossOrderId'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
    relationName: 'user_orders',
  }),
  orderProduct: many(orderProduct, { relationName: 'orderProduct' }),
}));

export type OrderSelectType = typeof orders.$inferSelect;
export type OrderInsertType = typeof orders.$inferInsert;
export type OrderUpdateType = Partial<OrderInsertType>;
