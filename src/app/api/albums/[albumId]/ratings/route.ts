// /app/api/albums/[albumId]/reviews/route.ts

import { NextResponse } from 'next/server';
import { getReviews } from '@/services/reviewService';

export async function GET(
  request: Request,
  { params }: { params: { albumId: string } }
) {
  const { albumId } = params;

  try {
    const reviews = await getReviews(albumId);

    return NextResponse.json(reviews);
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    if (error.message === 'Album not found') {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}