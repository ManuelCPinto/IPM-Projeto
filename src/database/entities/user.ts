// user.ts

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  username: text('username').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password', { length: 6 }).notNull(),
  type: text('type')
    .$type<'user' | 'artist'>()
    .default('user'),  picture: text('picture').notNull(),
  followers: integer('followers').notNull(),
  following: integer('following').notNull(),
  monthlyListeners: integer('monthlyListeners').notNull()
})

export type User = typeof usersTable.$inferSelect
