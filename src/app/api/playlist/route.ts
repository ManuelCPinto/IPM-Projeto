import { db } from '@/database'
import { playlistsTable } from '@/database/schema'
import { like } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const queries = req.nextUrl.searchParams
    await db.insert(playlistsTable).values({
      name: queries.get('name')!,
      author: queries.get('author')!,
      imageURL: queries.get('imageURL')!,
      songs: queries.get('songs')!
    })
    return Response.json(true)
  } catch {
    return Response.json(false)
  }
}

export async function GET(req: NextRequest) {
  const queries = req.nextUrl.searchParams
  const playlists = await db.query.playlistsTable.findMany({
    where: like(playlistsTable.name, `%${queries.get('name') || ''}%`)
  })
  return Response.json(playlists)
}
