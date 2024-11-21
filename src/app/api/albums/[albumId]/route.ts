/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/api/albums/[albumId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { albumsTable } from '@/database/schema';
import { eq } from 'drizzle-orm'; 

export async function GET(
  req: NextRequest,
  { params }: { params: { albumId: string } }
) {
  const { albumId } = params;
  console.log(`Fetching album with albumId: ${albumId}`);

  try {
    const album = await db.query.albumsTable.findFirst({
      where: eq(albumsTable.albumId, albumId),
    });

    if (!album) {
      console.log(`Album not found: ${albumId}`);
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    console.log(`Album found: ${JSON.stringify(album)}`);
    return NextResponse.json(album);
  } catch (error: any) {
    console.error('Error fetching album:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
