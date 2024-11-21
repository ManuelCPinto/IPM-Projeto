import { NextRequest } from 'next/server'
import { db } from '@/database'
import { songsTable } from '@/database/entities/song'
import { like, sql } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const queries = request.nextUrl.searchParams
    const songs = await db.query.songsTable.findMany({
      where: like(songsTable.name, `%${queries.get('query')}%`),
      orderBy: sql`RANDOM()`
    })
    return Response.json(songs)
  } catch {
    return Response.json(null)
  }
}
