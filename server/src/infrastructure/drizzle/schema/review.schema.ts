import {
  index,
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { products } from './products.schema';
import { relations } from 'drizzle-orm';

export const reviews = pgTable(
  'reviews',
  {
    id: serial('id').primaryKey(),
    rating: real('rating').notNull(),
    userId: serial('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    productId: serial('productId')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    comment: text('comment').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => {
    return {
      productIdx: index('product_idx').on(table.productId),
      userIdx: index('user_idx').on(table.userId),
    };
  },
);

export const reviewRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));
