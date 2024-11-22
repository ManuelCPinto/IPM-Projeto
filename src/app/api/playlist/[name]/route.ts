// /app/api/playlist/[playlistId]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/database'
import { playlistTable } from '@/database/schema'
import { eq } from 'drizzle-orm'

export const runtime = 'edge'

export async function GET(request: NextRequest, response: NextResponse, { params }: { params: { name: string } }) {
  const { name } = params
  console.log(`Fetching playlist with name: ${name}`)

  try {
    const playlist = await db.query.albumsTable.findFirst({
      where: eq(playlistTable.name, name)
    })

    if (!playlist) {
      console.log(`Playlist not found: ${name}`)
      return NextResponse.json({ error: 'Playlist not found' }, { status: 404 })
    }

    console.log(`Playlist found: ${JSON.stringify(playlist)}`)
    return NextResponse.json(playlist)
  } catch (error) {
    console.error('Error fetching playlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
