import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  real,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { productVariants } from './product-variant.schema';
import { reviews } from './review.schema';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
  productVariants: many(productVariants),
  reviews: many(reviews),
}));

export type ProductSelectType = typeof products.$inferSelect;
export type ProductInsertType = typeof products.$inferInsert;
export type ProductUpdateType = Partial<ProductInsertType>;
