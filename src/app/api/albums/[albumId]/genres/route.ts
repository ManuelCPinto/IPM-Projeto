// /app/api/albums/[albumId]/genres/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/database'
import { genresTable, albumsTable, albumGenresTable } from '@/database/schema'
import { eq } from 'drizzle-orm'

export const runtime = 'edge'

export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { albumId: number } }) {
  const { albumId } = params

  try {
    // Fetch album to get internal ID
    const album = await db.select().from(albumsTable).where(eq(albumsTable.id, albumId)).get()

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    // Fetch genres
    const genresData = await db
      .select({ name: genresTable.name })
      .from(albumGenresTable)
      .leftJoin(genresTable, eq(albumGenresTable.genreId, genresTable.id))
      .where(eq(albumGenresTable.albumId, album.id))
      .all()

    const genres = genresData.map((g) => g.name)

    return NextResponse.json(genres)
  } catch (error) {
    console.error('Error fetching genres:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
