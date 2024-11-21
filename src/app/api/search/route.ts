// /app/api/search/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/database';
import { albumsTable, songsTable, usersTable } from '@/database/schema';
import { like } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Fetch matching albums
    const albums = await db
      .select({ id: albumsTable.albumId, name: albumsTable.name })
      .from(albumsTable)
      .where(like(albumsTable.name, `%${query}%`))
      .then((rows) => rows.map((row) => ({ ...row, type: 'Album' })));

    // Fetch matching songs
    const songs = await db
      .select({ id: songsTable.id, name: songsTable.name })
      .from(songsTable)
      .where(like(songsTable.name, `%${query}%`))
      .then((rows) => rows.map((row) => ({ ...row, type: 'Song' })));

    // Fetch matching artists
    const artists = await db
      .select({ id: usersTable.id, name: usersTable.username })
      .from(usersTable)
      .where(like(usersTable.username, `%${query}%`))
      .then((rows) => rows.map((row) => ({ ...row, type: 'Artist' })));

    const results = [...albums, ...songs, ...artists];

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
