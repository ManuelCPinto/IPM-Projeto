import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const genresTable = sqliteTable('genres', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique()
})

export type Genre = typeof genresTable.$inferInsert
