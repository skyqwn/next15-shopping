import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { orders } from './orders.schema';
import { relations } from 'drizzle-orm';
import { products } from './products.schema';
import { productVariants } from './product-variant.schema';

export const orderProduct = pgTable('order_product', {
  id: serial('id').primaryKey(),
  quantity: integer('quantity').notNull(),
  productVariantId: serial('productVariantId')
    .notNull()
    .references(() => productVariants.id),
  productId: serial('productId')
    .notNull()
    .references(() => products.id),
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
  productVariants: one(productVariants, {
    fields: [orderProduct.productVariantId],
    references: [productVariants.id],
    relationName: 'productVariants',
  }),
}));

export type OrderProductSelectType = typeof orderProduct.$inferSelect;
export type OrderProductInsertType = typeof orderProduct.$inferInsert;
export type OrderProductUpdateType = Partial<OrderProductInsertType>;
