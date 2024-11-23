import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/database'
import { songsTable, albumsTable } from '@/database/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest, res: NextResponse, context) {
  const { params } = context
  const { albumId } = await params

  try {
    // Fetch album to get internal ID
    const album = await db
      .select()
      .from(albumsTable)
      .where(eq(albumsTable.id, parseInt(albumId)))
      .get()

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    // Fetch songs (tracklist)
    const tracks = await db
      .select()
      .from(songsTable)
      .where(eq(songsTable.albumId, album.id))
      .orderBy(songsTable.trackNumber)
      .all()

    return NextResponse.json(tracks)
  } catch (error) {
    console.error('Error fetching tracklist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
