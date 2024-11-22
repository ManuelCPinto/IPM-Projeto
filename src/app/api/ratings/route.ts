/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/api/reviews/route.ts

import { NextResponse } from 'next/server'
import { db } from '@/database'
import { reviewsTable, albumsTable } from '@/database/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  try {
    const { albumId, user, stars, content } = await request.json()

    if (!albumId || !user || !stars || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const album = await db
      .select({ id: albumsTable.id })
      .from(albumsTable)
      .where(eq(albumsTable.id, parseInt(albumId)))
      .get()

    if (!album) {
      throw new Error('Album not found')
    }

    await db.insert(reviewsTable).values({
      albumId: album.id,
      user,
      date: new Date().toISOString(),
      stars,
      content
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: any) {
    console.error('Error inserting review:', error)
    if (error.message === 'Album not found') {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
