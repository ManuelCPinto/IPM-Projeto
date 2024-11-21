import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { usersTable } from './user';

export const albumsTable = sqliteTable('albums', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  albumId: text('album_id').notNull().unique(),
  name: text('name').notNull(),
  artist: integer('id')
  .notNull()
  .references(() => usersTable.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  releaseDate: text('release_date').notNull(),
  recorded: text('recorded').notNull(),
  rating: real('rating').notNull(),
  rated: integer('rated').notNull(),
  ranked: text('ranked').notNull(),
  cover: text('cover').notNull(),
  language: text('language').notNull(),
});

export type Album = typeof albumsTable.$inferSelect;
