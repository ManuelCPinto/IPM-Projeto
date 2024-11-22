import { NextResponse } from 'next/server'
import { db } from '@/database'
import { descriptorsTable, albumsTable, albumDescriptorsTable } from '@/database/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: Request, res: NextResponse, context: { params: { albumId: string } }) {
  try {
    // Wait for the params to be properly available
    const { albumId } = context.params

    // Fetch album to get internal ID
    const album = await db
      .select()
      .from(albumsTable)
      .where(eq(albumsTable.id, parseInt(albumId, 10)))
      .get()

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
