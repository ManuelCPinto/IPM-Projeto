import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { albumsTable} from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  context: { params: { albumId: string } }
) {
  const { params } = context;
  const { albumId } = params;

  try {
    const album = await db
    .select()
    .from(albumsTable)
    .where(eq(albumsTable.id, parseInt(albumId)))
    .get();

  if (!album) {
    return NextResponse.json({ error: 'Album not found' }, { status: 404 });
  }

    return NextResponse.json(album);
  } catch (error) {
    console.error('Error fetching album:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
