import { sqliteTable, integer, primaryKey } from 'drizzle-orm/sqlite-core'
import { albumsTable } from './album'
import { descriptorsTable } from './descriptor'

export const albumDescriptorsTable = sqliteTable(
  'tbc_album_descriptors',
  {
    albumId: integer('album_id')
      .notNull()
      .references(() => albumsTable.id, { onDelete: 'cascade' }),
    descriptorId: integer('descriptor_id')
      .notNull()
      .references(() => descriptorsTable.id, { onDelete: 'cascade' })
  },
  (table) => ({
    pk: primaryKey(table.albumId, table.descriptorId)
  })
)
export type tbcDescriptor = typeof albumDescriptorsTable.$inferInsert
