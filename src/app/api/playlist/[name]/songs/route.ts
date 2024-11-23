import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/database'
import { playlistTable, playlistSongsTable, songsTable } from '@/database/schema'
import { eq } from 'drizzle-orm'

export async function GET(req: NextRequest, context) {
  const { params } = context
  const { name } = await params

  try {
    // Fetch playlist to get internal ID
    const playlist = await db.select().from(playlistTable).where(eq(playlistTable.name, name)).get()

    if (!playlist) {
      return NextResponse.json({ error: 'Playlist not found' }, { status: 404 })
    }

    // Fetch songs in the playlist
    const songsData = await db
      .select()
      .from(playlistSongsTable)
      .leftJoin(songsTable, eq(playlistSongsTable.songId, songsTable.id))
      .where(eq(playlistSongsTable.playlistId, playlist.id))
      .orderBy(songsTable.trackNumber) // Assuming trackNumber exists in songs table
      .all()

    const songs = songsData.map((songData) => ({
      id: songData.songs?.id,
      title: songData.songs?.name,
      artist: songData.songs?.author,
      trackNumber: songData.songs?.trackNumber,
      duration: songData.songs?.duration
    }))

    return NextResponse.json(songs)
  } catch (error) {
    console.error('Error fetching songs:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
