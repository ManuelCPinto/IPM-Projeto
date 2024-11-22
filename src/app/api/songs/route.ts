import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { songsTable } from '@/database/entities/song';
import { albumsTable } from '@/database/entities/album';
import { usersTable } from '@/database/entities/user';
import { eq, like, sql } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');

    // Validate query parameter
    if (!query || query.trim() === '') {
      return NextResponse.json({ results: [] });
    }

    const results = await db
      .select({
        song: songsTable.name,
        album: albumsTable.name,
        author: usersTable.name,
      })
      .from(songsTable)
      .where(like(songsTable.name, `%${query}%`))
      .innerJoin(albumsTable, eq(albumsTable.id, songsTable.albumId))
      .innerJoin(usersTable, eq(usersTable.username, songsTable.author))
      .orderBy(sql`RANDOM()`);

    // Return the results
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
