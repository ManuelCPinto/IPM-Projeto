import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core';
import { usersTable } from './user';
import { songsTable } from './song';

export const likesTable = sqliteTable('likes', {
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.username, { onDelete: 'cascade' }), // User who liked the song
  songId: integer('song_id')
    .notNull()
    .references(() => songsTable.id, { onDelete: 'cascade' }), // Song that is liked
}, (table) => ({
  uniqueLike: unique().on(table.userId, table.songId), // Unique constraint for userId and songId
}));

export type Like = typeof likesTable.$inferSelect;
