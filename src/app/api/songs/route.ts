import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/database'
import { songsTable } from '@/database/entities/song'
import { albumsTable } from '@/database/entities/album'
import { usersTable } from '@/database/entities/user'
import { and, eq, like, sql } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('query')
    const albumId = parseInt(searchParams.get('album_id'))
    const limit = searchParams.get('limit')

    const results = await db
      .select({
        song: songsTable,
        album: albumsTable,
        author: usersTable
      })
      .from(songsTable)
      .innerJoin(albumsTable, eq(albumsTable.id, songsTable.albumId))
      .innerJoin(usersTable, eq(usersTable.username, songsTable.author))
      .where(and(like(songsTable.name, `%${query}%`), !isNaN(albumId) ? eq(albumsTable.id, albumId) : undefined))
      .limit(limit ? parseInt(limit) : undefined)
      .orderBy(sql`RANDOM()`)

    return NextResponse.json(results)
  } catch {
    return NextResponse.json(null)
  }
}
