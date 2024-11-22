import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { playlistTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  context: { params: { playlistId: string } }
) {
  const { params } = context;
  const { playlistId } = await params;

  try {
    const playlist = await db
      .select()
      .from(playlistTable)
      .where(eq(playlistTable.id, parseInt(playlistId)))
      .get();

    if (!playlist) {
      return NextResponse.json({ error: 'Playlist not found' }, { status: 404 });
    }

    return NextResponse.json(playlist);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
