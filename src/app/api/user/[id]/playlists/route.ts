import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/database'
import { playlistTable } from '@/database/schema'
import { eq, and } from 'drizzle-orm'

// GET Method: Fetch User Playlists
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const username = params.id

    if (!username) {
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 })
    }

    const playlists = await db.select().from(playlistTable).where(eq(playlistTable.author, username)).all()

    return NextResponse.json({ success: true, playlists })
  } catch (error) {
    console.error('Error fetching playlists:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

// POST Method: Create a New Playlist
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const username = params.id
    const { name, coverImage } = await req.json()

    if (!username || !name) {
      return NextResponse.json({ success: false, message: 'User ID and playlist name are required' }, { status: 400 })
    }

    // Insert the new playlist
    const result = await db.insert(playlistTable).values({
      name,
      author: username,
      cover: coverImage
    })

    if (result.rowsAffected === 0) {
      throw new Error('Failed to insert playlist')
    }

    // Fetch the created playlist
    const createdPlaylist = await db
      .select()
      .from(playlistTable)
      .where(and(eq(playlistTable.name, name), eq(playlistTable.author, username)))
      .get()

    return NextResponse.json({ success: true, playlist: createdPlaylist })
  } catch (error) {
    console.error('Error creating playlist:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
