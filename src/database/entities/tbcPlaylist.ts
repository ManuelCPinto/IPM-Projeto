import { sqliteTable, integer, primaryKey } from 'drizzle-orm/sqlite-core'
import { playlistTable } from './playlist'
import { songsTable } from './song'

export const playlistSongsTable = sqliteTable(
  'tbc_playlist_songs',
  {
    playlistId: integer('playlist_id')
      .notNull()
      .references(() => playlistTable.id, { onDelete: 'cascade' }),
    songId: integer('song_id')
      .notNull()
      .references(() => songsTable.id, { onDelete: 'cascade' })
  },
  (table) => ({
    pk: primaryKey(table.playlistId, table.songId)
  })
)
export type tbcPlaylistSongs = typeof playlistSongsTable.$inferInsert