import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { orders } from './orders.schema';
import { relations } from 'drizzle-orm';
import { products } from './products.schema';

export const orderProduct = pgTable('order_product', {
  id: serial('id').primaryKey(),
  quantity: integer('quantity').notNull(),
  productVariantId: serial('productVariantId').notNull(),
  productId: serial('productId').notNull(),
  orderId: serial('orderId')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const orderProductRelations = relations(orderProduct, ({ one }) => ({
  order: one(orders, {
    fields: [orderProduct.orderId],
    references: [orders.id],
    relationName: 'orderProduct',
  }),
  product: one(products, {
    fields: [orderProduct.productId],
    references: [products.id],
    relationName: 'products',
  }),
}));

export type OrderProductSelectType = typeof orderProduct.$inferSelect;
export type OrderProductInsertType = typeof orderProduct.$inferInsert;
export type OrderProductUpdateType = Partial<OrderProductInsertType>;
