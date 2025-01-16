import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { products } from './products.schema';
import { relations } from 'drizzle-orm';

export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  uri: text('uri').notNull(),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
});

export const imagesRelations = relations(images, ({ one, many }) => ({
  product: one(products, {
    fields: [images.productId],
    references: [products.id],
  }),
}));
