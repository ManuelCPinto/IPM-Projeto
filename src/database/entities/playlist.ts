// playlist.ts

import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const playlistTable = sqliteTable('playlist', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  author: text('author').notNull(),
  cover: text('cover').notNull(),
});

export type Playlist = typeof playlistTable.$inferSelect;
