/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/api/albums/[albumId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { albumsTable, usersTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: { albumId: string } }
) {
  const { albumId } = params;
  console.log(`Fetching album with albumId: ${albumId}`);

  try {
    const albumWithArtist = await db
      .select({
        id: albumsTable.id,
        name: albumsTable.name,
        artist: usersTable.name,
        type: albumsTable.type,
        releaseDate: albumsTable.releaseDate,
        recorded: albumsTable.recorded,
        rating: albumsTable.rating,
        rated: albumsTable.rated,
        ranked: albumsTable.ranked,
        cover: albumsTable.cover,
        language: albumsTable.language,
      })
      .from(albumsTable)
      .leftJoin(usersTable, eq(albumsTable.artist, usersTable.username)) 
      .where(eq(albumsTable.id, parseInt(albumId)))
      .limit(1);

    if (!albumWithArtist || albumWithArtist.length === 0) {
      console.log(`Album not found: ${albumId}`);
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    console.log(`Album found: ${JSON.stringify(albumWithArtist[0])}`);
    return NextResponse.json(albumWithArtist[0]);
  } catch (error: any) {
    console.error('Error fetching album:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
