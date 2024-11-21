import { sqliteTable, integer, text} from 'drizzle-orm/sqlite-core';
import { albumsTable } from './album';

export const reviewsTable = sqliteTable('reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  albumId: text('album_id')
    .notNull()
    .references(() => albumsTable.albumId, { onDelete: 'cascade' }),
  user: text('user').notNull(),
  date: text('date').notNull(),
  stars: integer('stars').notNull(),
  content: text('content').notNull(),
});

export type Review = typeof reviewsTable.$inferSelect;
