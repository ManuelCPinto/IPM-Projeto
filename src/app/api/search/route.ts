import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { albumsTable, songsTable, usersTable, playlistTable } from '@/database/schema';
import { eq, like, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get('query') || '';

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Fetch matching albums
    const albums = await db
      .select({ id: albumsTable.id, name: albumsTable.name, cover: albumsTable.cover })
      .from(albumsTable)
      .where(like(albumsTable.name, `%${query}%`))
      .then((rows) => rows.map((row) => ({ ...row, type: 'Album' })));

    // Fetch matching songs
    const songs = await db
      .select({ id: songsTable.id, name: songsTable.name, cover: songsTable.cover })
      .from(songsTable)
      .where(like(songsTable.name, `%${query}%`))
      .then((rows) => rows.map((row) => ({ ...row, type: 'Song' })));

    // Fetch matching users with type 'User'
    const users = await db
      .select({ id: usersTable.username, name: usersTable.name, picture: usersTable.picture })
      .from(usersTable)
      .where(and(eq(usersTable.type, 'user'), like(usersTable.name, `%${query}%`)))
      .then((rows) => rows.map((row) => ({ ...row, type: 'User' })));

    // Fetch matching artists with type 'Artist'
    const artists = await db
      .select({ id: usersTable.username, name: usersTable.name, picture: usersTable.picture })
      .from(usersTable)
      .where(and(eq(usersTable.type, 'artist'), like(usersTable.name, `%${query}%`)))
      .then((rows) => rows.map((row) => ({ ...row, type: 'Artist' })));

    // Fetch matching playlists
    const playlists = await db
      .select({ id: playlistTable.id, name: playlistTable.name, cover: playlistTable.cover })
      .from(playlistTable)
      .where(like(playlistTable.name, `%${query}%`))
      .then((rows) => rows.map((row) => ({ ...row, type: 'Playlist' })));

    // Combine all results
    const results = [...albums, ...songs, ...users, ...artists, ...playlists];

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
