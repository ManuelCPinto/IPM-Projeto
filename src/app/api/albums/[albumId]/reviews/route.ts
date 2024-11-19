// /app/api/albums/[albumId]/reviews/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/database';
import { reviewsTable, albumsTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { albumId: string } }
) {
  const { albumId } = params;

  try {
    // Fetch album to get internal ID
    const album = await db
      .select()
      .from(albumsTable)
      .where(eq(albumsTable.albumId, albumId))
      .get();

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    // Fetch reviews associated with the album
    const reviews = await db
      .select()
      .from(reviewsTable)
      .where(eq(reviewsTable.albumId, album.id))
      .all();

    return NextResponse.json(reviews);
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { albumId: string } }
) {
  const { albumId } = params;

  try {
    const { user, stars, content } = await request.json();

    // Input validation
    if (!user || stars === undefined || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch album to get internal ID
    const album = await db
      .select()
      .from(albumsTable)
      .where(eq(albumsTable.albumId, albumId))
      .get();

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    // Insert the new review
    await db.insert(reviewsTable).values({
      albumId: album.id,
      user,
      date: new Date().toISOString(),
      stars,
      content,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Error inserting review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
