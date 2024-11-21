import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const descriptorsTable = sqliteTable('descriptors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique()
})

export type Descriptor = typeof descriptorsTable.$inferInsert
