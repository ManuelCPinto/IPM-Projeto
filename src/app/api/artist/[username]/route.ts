import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { usersTable, songsTable, albumsTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest, { params }) {
  const username = params.username;

  if (!username) {
    return NextResponse.json({ success: false, message: 'Username is required' }, { status: 400 });
  }

  try {
    const artist = await db.select().from(usersTable).where(eq(usersTable.username, username)).get();

    if (!artist || artist.type !== 'artist') {
      return NextResponse.json({ success: false, message: 'Artist not found or not an artist' }, { status: 404 });
    }

    // Fetch songs with song, artist, and album details
    const songs = await db
      .select({
        song: songsTable,
        artist: usersTable,
        album: albumsTable,
      })
      .from(songsTable)
      .leftJoin(usersTable, eq(songsTable.author, usersTable.username))
      .leftJoin(albumsTable, eq(songsTable.albumId, albumsTable.id))
      .where(eq(songsTable.author, artist.username))
      .all();

    // Fetch albums by the artist
    const albums = await db.select().from(albumsTable).where(eq(albumsTable.artist, artist.username)).all();

    return NextResponse.json({
      success: true,
      artist,
      songs,
      albums,
    });
  } catch (error) {
    console.error('Error fetching artist data:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
