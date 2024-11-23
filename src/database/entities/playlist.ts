// playlist.ts

import { sqliteTable, integer, text, unique } from 'drizzle-orm/sqlite-core';

export const playlistTable = sqliteTable('playlist', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  author: text('author').notNull(),
  cover: text('cover').notNull(),
},
(table) => ({
  uniqueFollow: unique().on(table.id, table.id), // Ensures unique follow relationships
}));
export type Playlist = typeof playlistTable.$inferSelect;
