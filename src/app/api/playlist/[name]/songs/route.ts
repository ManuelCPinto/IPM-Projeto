import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import {
  playlistTable,
  playlistSongsTable,
  songsTable,
  usersTable,
  albumsTable,
} from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest, context: { params: { name: string } }) {
  const { params } = context;
  const { name } = params;

  try {
    // Fetch playlist to validate existence
    const playlist = await db
      .select()
      .from(playlistTable)
      .where(eq(playlistTable.id, parseInt(name)))
      .get();

    if (!playlist) {
      return NextResponse.json({ error: 'Playlist not found' }, { status: 404 })
    }

    // Fetch songs with artist and album details
    const songsData = await db
      .select({
        song: songsTable,
        artist: usersTable,
        album: albumsTable,
      })
      .from(playlistSongsTable)
      .leftJoin(songsTable, eq(playlistSongsTable.songId, songsTable.id))
      .leftJoin(usersTable, eq(songsTable.author, usersTable.username))
      .leftJoin(albumsTable, eq(songsTable.albumId, albumsTable.id))
      .where(eq(playlistSongsTable.playlistId, parseInt(name)))
      .orderBy(songsTable.trackNumber)
      .all();

    return NextResponse.json(songsData);
  } catch (error) {
    console.error('Error fetching songs with details:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
