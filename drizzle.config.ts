import type { Config } from 'drizzle-kit'

const isLocalDB = process.env.DB_URL?.startsWith('file')

export default {
  schema: './src/database/schema.ts',
  out: './drizzle/migrations',
  dialect: isLocalDB ? 'sqlite' : 'turso',
  dbCredentials: {
    url: process.env.DB_URL!,
    authToken: isLocalDB ? undefined : process.env.DB_AUTH_TOKEN!
  }
} satisfies Config
