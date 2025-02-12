import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { products } from './products.schema';
import { relations } from 'drizzle-orm';
import { variantImages } from './variant-images.schema';
import { variantTags } from './variant-tag.schema';

export const productVariants = pgTable('productVariants', {
  id: serial('id').primaryKey(),
  color: text('color').notNull(),
  productType: text('productType').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  productId: serial('productId')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
});

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    variantImages: many(variantImages),
    variantTags: many(variantTags),
  }),
);
