import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { songsTable, albumsTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const results = await db
      .select({
        song: songsTable.name,
        album: albumsTable.name,
        cover: albumsTable.cover,
      })
      .from(songsTable)
      .innerJoin(albumsTable, eq(songsTable.albumId, albumsTable.id))
      .orderBy(songsTable.id) // Adjust ordering logic as needed
      .limit(5);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching recently listened:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
