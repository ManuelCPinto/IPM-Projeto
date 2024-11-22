import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'
import { usersTable } from '@/database/entities/user'

export const albumsTable = sqliteTable('albums', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  artist: text('artist')
    .notNull()
    .references(() => usersTable.username),
  type: text('type').$type<'album'>().default('album'),
  releaseDate: text('release_date').notNull(),
  recorded: text('recorded').notNull(),
  rating: real('rating').notNull(),
  rated: integer('rated').notNull(),
  ranked: text('ranked').notNull(),
  cover: text('cover').notNull(),
  language: text('language').notNull()
})

export type Album = typeof albumsTable.$inferSelect
