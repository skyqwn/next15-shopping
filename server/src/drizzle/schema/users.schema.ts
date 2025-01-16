import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  pgEnum,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const loginTypeEnum = pgEnum('user_login_type_v2', [
  'email',
  'kakao',
  'google',
]);

export const userRolesEnum = pgEnum('user_roles', ['ADMIN', 'USER']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password'),
  loginType: loginTypeEnum('users_loginType').notNull(),
  role: userRolesEnum('role').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  isVerified: boolean('isVerified').notNull(),
  imageUri: text('imageUri'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
});

export type UserSelectType = typeof users.$inferSelect;
export type UserInsertType = typeof users.$inferInsert;
