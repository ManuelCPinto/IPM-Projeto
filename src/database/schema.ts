import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users', {
  username: text().primaryKey(),
  password: text().notNull()
})
export type User = typeof usersTable.$inferInsert

export const musicsTable = sqliteTable(
  'musics',
  {
    name: text().notNull(),
    author: text()
      .notNull()
      .references(() => usersTable.username, { onDelete: 'cascade' }),
    imageURL: text().notNull(),
    audioURL: text().notNull()
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.name, table.author] })
    }
  }
)
export type Music = typeof musicsTable.$inferInsert
