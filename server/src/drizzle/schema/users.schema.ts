import { relations } from 'drizzle-orm';
import { pgTable, serial, text, pgEnum, timestamp } from 'drizzle-orm/pg-core';

export const loginTypeEnum = pgEnum('user_login_type_v2', [
  'email',
  'kakao',
  'google',
]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  loginType: loginTypeEnum('users_loginType').notNull(),
  name: text('name').notNull(),
  imageUri: text('imageUri'),
  kakaoImageUri: text('kakaoImageUri'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
});

export type UserSelectType = typeof users.$inferSelect;
export type UserInsertType = typeof users.$inferInsert;
