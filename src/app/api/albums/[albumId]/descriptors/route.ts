// /app/api/albums/[albumId]/descriptors/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/database'
import { descriptorsTable, albumsTable, albumDescriptorsTable } from '@/database/schema'
import { eq } from 'drizzle-orm'

export const runtime = 'edge'

export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { albumId: number } }) {
  const { albumId } = params

  try {
    // Fetch album to get internal ID
    const album = await db.select().from(albumsTable).where(eq(albumsTable.id, albumId)).get()

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    // Fetch descriptors
    const descriptorsData = await db
      .select({ name: descriptorsTable.name })
      .from(albumDescriptorsTable)
      .leftJoin(descriptorsTable, eq(albumDescriptorsTable.descriptorId, descriptorsTable.id))
      .where(eq(albumDescriptorsTable.albumId, album.id))
      .all()

    const descriptors = descriptorsData.map((d) => d.name)

    return NextResponse.json(descriptors)
  } catch (error) {
    console.error('Error fetching descriptors:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
