import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { albumsTable } from './album';

export const reviewsTable = sqliteTable('reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  albumId: integer('album_id')
    .notNull()
    .references(() => albumsTable.id, { onDelete: 'cascade' }),
  user: text('user').notNull(),
  date: text('date').notNull(),
  stars: real('stars').notNull(),
  content: text('content').notNull(),
});

export type Review = typeof reviewsTable.$inferSelect;