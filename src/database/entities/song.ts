// song.ts

import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { albumsTable } from './album';

export const songsTable = sqliteTable('songs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  albumId: integer('album_id')
    .notNull()
    .references(() => albumsTable.id, { onDelete: 'cascade' }),
  trackNumber: integer('track_number').notNull(),
  name: text('name').notNull(),
  duration: text('duration').notNull(),
  feature: text('feature'),
});

export type Song = typeof songsTable.$inferSelect;
