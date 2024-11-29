import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { songsTable } from '@/database/entities/song';
import { albumsTable } from '@/database/entities/album';
import { usersTable } from '@/database/entities/user';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const songId = req.nextUrl.pathname.split('/').pop();
    if (!songId || isNaN(Number(songId))) {
      return NextResponse.json({ error: 'Invalid song ID' }, { status: 400 });
    }

    const songData = await db
      .select({
        song: songsTable,
        artist: usersTable,
        album: albumsTable,
      })
      .from(songsTable)
      .leftJoin(usersTable, eq(songsTable.author, usersTable.username))
      .leftJoin(albumsTable, eq(songsTable.albumId, albumsTable.id))
      .where(eq(songsTable.id, parseInt(songId)))
      .all();

    // Validar se a música foi encontrada
    if (songData.length === 0) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    }

    return NextResponse.json(songData[0]);
  } catch (error) {
    console.error('Error fetching song data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch song data' },
      { status: 500 }
    );
  }
}
