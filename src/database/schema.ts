import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users', {
  username: text().primaryKey(),
  password: text().notNull()
})
export type User = typeof usersTable.$inferInsert

export const musicsTable = sqliteTable('musics', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  author: text()
    .notNull()
    .references(() => usersTable.username, { onDelete: 'cascade' }),
  imageURL: text().notNull(),
  duration: int().notNull()
})
export type Music = typeof musicsTable.$inferInsert
