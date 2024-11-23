import { sqliteTable, integer, primaryKey } from 'drizzle-orm/sqlite-core'
import { albumsTable } from './album'
import { genresTable } from './genre'

export const albumGenresTable = sqliteTable(
  'tbc_album_genres',
  {
    albumId: integer('album_id')
      .notNull()
      .references(() => albumsTable.id, { onDelete: 'cascade' }),
    genreId: integer('genre_id')
      .notNull()
      .references(() => genresTable.id, { onDelete: 'cascade' })
  },
  (table) => ({
    pk: primaryKey(table.albumId, table.genreId)
  })
)

export type tbcGenre = typeof albumGenresTable.$inferInsert
