import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/database'
import { albumsTable } from '@/database/entities/album'
import { usersTable } from '@/database/entities/user'
import { eq, like, sql } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('query')
    const limit = searchParams.get('limit')

    const results = await db
      .select({
        album: albumsTable,
        artist: usersTable
      })
      .from(albumsTable)
      .where(like(albumsTable.name, `%${query}%`))
      .innerJoin(usersTable, eq(usersTable.username, albumsTable.artist))
      .limit(limit ? parseInt(limit) : undefined)
      .orderBy(sql`RANDOM()`)

    return NextResponse.json(results)
  } catch {
    return NextResponse.json(null)
  }
}
