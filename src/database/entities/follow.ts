import { sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';
import { usersTable } from './user';

export const followsTable = sqliteTable('follows', {
  follower: text('follower')
    .notNull()
    .references(() => usersTable.username, { onDelete: 'cascade' }), // User who follows
  following: text('following')
    .notNull()
    .references(() => usersTable.username, { onDelete: 'cascade' }), // User being followed
},
(table) => ({
  uniqueFollow: unique().on(table.follower, table.following), // Ensures unique follow relationships
}));

export type Follow = typeof followsTable.$inferSelect;
