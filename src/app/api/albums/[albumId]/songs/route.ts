import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { albumsTable, songsTable, usersTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  context: { params: { albumId: string } }
) {
  const { params } = context;
  const { albumId } = params;

  try {
    const songs = await db
    .select({
      song: songsTable,
      artist: usersTable.name,
      album: albumsTable.name,
      })
      .from(albumsTable)
      .leftJoin(songsTable, eq(albumsTable.id, songsTable.albumId))
      .leftJoin(usersTable, eq(albumsTable.artist, usersTable.username))
      .where(eq(songsTable.albumId, parseInt(albumId)))
      .orderBy(songsTable.trackNumber)
      .all();

    return NextResponse.json(songs);
  } catch (error) {
    console.error('Error fetching album and tracklist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
