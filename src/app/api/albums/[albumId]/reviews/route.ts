/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { db } from '@/database';
import { reviewsTable, albumsTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { albumId: string } }
) {
  try {
    const { albumId } = params;

    const data = await db
      .select()
      .from(albumsTable)
      .innerJoin(reviewsTable, eq(albumsTable.id, reviewsTable.albumId))
      .where(eq(albumsTable.id, parseInt(albumId))) 
      .orderBy(reviewsTable.date)
      .all();

    if (data.length === 0) {
      return NextResponse.json({ error: 'Album not found or has no reviews' }, { status: 404 });
    }

    const reviews = data.map((entry) => ({
      reviewId: entry.reviews.id,
      user: entry.reviews.user,
      stars: entry.reviews.stars,
      content: entry.reviews.content,
      date: entry.reviews.date,
    }));

    return NextResponse.json({
      albumId: data[0].albums.id,
      albumTitle: data[0].albums.name,
      reviews,
    });
  } catch (error) {
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

    if (!user || stars === undefined || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const album = await db
      .select()
      .from(albumsTable)
      .where(eq(albumsTable.id, parseInt(albumId)))
      .get();

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

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
