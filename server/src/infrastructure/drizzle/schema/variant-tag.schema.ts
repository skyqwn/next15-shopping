import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { productVariants } from './product-variant.schema';

export const variantTags = pgTable('variantTags', {
  id: serial('id').primaryKey(),
  tag: text('tag').notNull(),
  variantId: serial('variantId')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'cascade' }),
});

export type VariantTagSelectType = typeof variantTags.$inferSelect;
export type VariantTagInsertType = typeof variantTags.$inferInsert;
