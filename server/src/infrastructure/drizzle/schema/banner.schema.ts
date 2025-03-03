import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const banners = pgTable('banners', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type BannerSelectType = typeof banners.$inferSelect;
export type BannerInsertType = typeof banners.$inferInsert;
export type BannerUpdateType = Partial<BannerInsertType>;
