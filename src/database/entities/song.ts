// song.ts

import { sqliteTable, integer, text, unique } from 'drizzle-orm/sqlite-core'
import { albumsTable } from './album'
import { usersTable } from '@/database/entities/user'

export const songsTable = sqliteTable('songs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  albumId: integer('album_id')
    .notNull()
    .references(() => albumsTable.id, { onDelete: 'cascade' }),
  trackNumber: integer('track_number').notNull(),
  name: text('name').notNull(),
  duration: text('duration').notNull(),
  feature: text('feature'),
  author: text('author')
    .notNull()
    .references(() => usersTable.username, { onDelete: 'cascade' }),
  cover: text(),
  audio: text()
},
(table) => ({
  uniqueFollow: unique().on(table.id, table.id),
}));

export type Song = typeof songsTable.$inferSelect
