import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const albumsTable = sqliteTable('albums', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  albumId: text('album_id').notNull().unique(),
  name: text('name').notNull(),
  artist: text('artist').notNull(),
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
