import {
  pgTable,
  serial,
  varchar,
  text,
  numeric,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users.schema';
import { images } from './images.schema';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  brandName: varchar('brand_name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  userId: serial('user_id').references(() => users.id),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  user: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),
  images: many(images),
  //   categories: many(categories),
  //   cartItems: many(cartItems),
  //   reviews: many(reviews),
  //   orderProducts: many(orderProducts),
}));

export type ProductSelectType = typeof products.$inferSelect;
export type ProductInsertType = typeof products.$inferInsert;
