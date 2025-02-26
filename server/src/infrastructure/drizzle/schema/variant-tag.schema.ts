import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { productVariants } from './product-variant.schema';
import { relations } from 'drizzle-orm';

export const variantTags = pgTable('variantTags', {
  id: serial('id').primaryKey(),
  tag: text('tag').notNull(),
  variantId: serial('variantId')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'cascade' }),
});

export const variantTagsRelations = relations(variantTags, ({ one }) => ({
  productVariants: one(productVariants, {
    fields: [variantTags.variantId],
    references: [productVariants.id],
    relationName: 'variantTags',
  }),
}));

export type VariantTagSelectType = typeof variantTags.$inferSelect;
export type VariantTagInsertType = typeof variantTags.$inferInsert;
