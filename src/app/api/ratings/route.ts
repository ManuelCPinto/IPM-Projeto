/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/api/reviews/route.ts

import { NextResponse } from 'next/server';
import { insertReview } from '@/services/reviewService';

export async function POST(request: Request) {
  try {
    const { albumId, user, stars, content } = await request.json();

    // Input validation
    if (!albumId || !user || !stars || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Use the service to insert the review
    await insertReview(albumId, user, stars, content);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Error inserting review:', error);
    if (error.message === 'Album not found') {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
