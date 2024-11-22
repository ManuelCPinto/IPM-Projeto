import { NextRequest } from 'next/server'
import { db } from '@/database'
import { songsTable } from '@/database/entities/song'
import { albumsTable } from '@/database/entities/album'
import { usersTable } from '@/database/entities/user'
import { eq, like, sql } from 'drizzle-orm'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const queries = req.nextUrl.searchParams

    const result = await db
      .select({
        song: songsTable,
        album: albumsTable,
        author: usersTable
      })
      .from(songsTable)
      .where(like(songsTable.name, `%${queries.get('query')}%`))
      .innerJoin(albumsTable, eq(albumsTable.id, songsTable.albumId))
      .innerJoin(usersTable, eq(usersTable.username, songsTable.author))
      .orderBy(sql`RANDOM()`)

    return Response.json(result)
  } catch {
    return Response.json(null)
  }
}
