// /app/api/albums/[albumId]/reviews/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/database'
import { reviewsTable, albumsTable } from '@/database/schema'
import { eq } from 'drizzle-orm'

export const runtime = 'edge'

export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { albumId: number } }) {
  try {
    const { albumId } = params

    // Fetch album to get internal ID
    const album = await db.select().from(albumsTable).where(eq(albumsTable.id, albumId)).get()

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    // Fetch reviews associated with the album
    const reviews = await db.select().from(reviewsTable).where(eq(reviewsTable.albumId, album.id)).all()

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest, response: NextResponse, { params }: { params: { albumId: number } }) {
  try {
    const { albumId } = params

    const { user, stars, content } = await request.json()

    // Input validation
    if (!user || stars === undefined || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Fetch album to get internal ID
    const album = await db.select().from(albumsTable).where(eq(albumsTable.id, albumId)).get()

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    // Insert the new review
    await db.insert(reviewsTable).values({
      albumId: album.id,
      user,
      date: new Date().toISOString(),
      stars,
      content
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Error inserting review:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
