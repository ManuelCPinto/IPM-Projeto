// services/albumService.ts

import { db } from '@/database'
import {
  albumsTable,
  songsTable,
  genresTable,
  descriptorsTable,
  albumDescriptorsTable,
  albumGenresTable
} from '@/database/schema'
import { eq } from 'drizzle-orm'

export async function getAlbumData(albumId: number) {
  // Fetch album
  const album = await db.select().from(albumsTable).where(eq(albumsTable.id, albumId)).get()

  if (!album) {
    throw new Error('Album not found')
  }

  const albumDbId = album.id

  // Fetch genres
  const genresData = await db
    .select({ name: genresTable.name })
    .from(albumGenresTable)
    .leftJoin(genresTable, eq(albumGenresTable.genreId, genresTable.id))
    .where(eq(albumGenresTable.albumId, albumDbId))
    .all()
  const genres = genresData.map((g) => g.name)

  // Fetch descriptors
  const descriptorsData = await db
    .select({ name: descriptorsTable.name })
    .from(albumDescriptorsTable)
    .leftJoin(descriptorsTable, eq(albumDescriptorsTable.descriptorId, descriptorsTable.id))
    .where(eq(albumDescriptorsTable.albumId, albumDbId))
    .all()
  const descriptors = descriptorsData.map((d) => d.name)

  // Fetch tracks (songs)
  const tracks = await db
    .select()
    .from(songsTable)
    .where(eq(songsTable.albumId, albumDbId))
    .orderBy(songsTable.trackNumber)
    .all()

  return {
    ...album,
    genres,
    descriptors,
    tracklist: tracks
  }
}
