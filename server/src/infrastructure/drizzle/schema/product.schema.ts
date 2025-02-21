import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const ProductCategory = [
  'sneakers',
  'clothing',
  'accessories',
  'tech',
  'life',
] as const;
export type ProductCategoryType = (typeof ProductCategory)[number];

export const productCategoryEnum = pgEnum('product_category', [
  'sneakers',
  'clothing',
  'accessories',
  'tech',
  'life',
]);

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  brand: text('brand').notNull(),
  price: integer('price').notNull(),
  immediatePrice: integer('immediatePrice').notNull(),
  description: text('description'),
  category: productCategoryEnum('category').notNull(),
  imageUrl: text('imageUrl').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
});

export type ProductSelectType = typeof product.$inferSelect;
export type ProductInsertType = typeof product.$inferInsert;
export type ProductUpdateType = Partial<ProductInsertType>;
