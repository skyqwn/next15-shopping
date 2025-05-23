import { pgTable, real, serial, text } from 'drizzle-orm/pg-core';
import { productVariants } from './product-variant.schema';
import { relations } from 'drizzle-orm';

export const variantImages = pgTable('variantImages', {
  id: serial('id').primaryKey(),
  url: text('url').notNull().unique(),
  size: real('size').notNull(),
  fileName: text('name').notNull(),
  order: real('order').notNull(),
  blurThumb: text('blurThumb'),
  variantId: serial('variantId')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'cascade' }),
});

export const variantImagesRelations = relations(variantImages, ({ one }) => ({
  productVariants: one(productVariants, {
    fields: [variantImages.variantId],
    references: [productVariants.id],
    relationName: 'variantImages',
  }),
}));

export type VariantImageSelectType = typeof variantImages.$inferSelect;
export type VariantImageInsertType = typeof variantImages.$inferInsert;
