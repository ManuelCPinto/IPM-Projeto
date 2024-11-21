// user.ts

import { sqliteTable, integer, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable(
  'users',
  {
    id: integer('id').primaryKey({autoIncrement: true}),
    username: text('username').notNull(),
    password: text('password').notNull(),
  },
  (table) => ({
    uniqueUsername: uniqueIndex('unique_username').on(table.username),
  })
);

export type User = typeof usersTable.$inferSelect;
