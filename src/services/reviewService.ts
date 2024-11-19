// services/reviewService.ts

import { db } from '@/database';
import { reviewsTable, albumsTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

// Function to insert a review
export async function insertReview(albumId: string, user: string, stars: number, content: string) {
  // Check if the album exists
  const album = await db
    .select({ id: albumsTable.id })
    .from(albumsTable)
    .where(eq(albumsTable.albumId, albumId))
    .get();

  if (!album) {
    throw new Error('Album not found');
  }

  // Insert the review into the database
  await db.insert(reviewsTable).values({
    albumId: album.id,
    user,
    date: new Date().toISOString(),
    stars,
    content,
  });
}

// Function to get reviews for an album
export async function getReviews(albumId: string) {
  // Fetch album to get internal id
  const album = await db
    .select()
    .from(albumsTable)
    .where(eq(albumsTable.albumId, albumId))
    .get();

  if (!album) {
    throw new Error('Album not found');
  }

  // Fetch reviews
  const reviews = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.albumId, album.id))
    .orderBy(reviewsTable.date)
    .all();

  return reviews;
}
