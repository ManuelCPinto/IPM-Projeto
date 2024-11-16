import { db } from '@/database'
import { musicsTable } from '@/database/schema'
import { like } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const queries = req.nextUrl.searchParams
    await db.insert(musicsTable).values({
      name: queries.get('name')!,
      author: queries.get('author')!,
      imageURL: queries.get('imageURL')!,
      audioURL: queries.get('audioURL')!
    })
    return Response.json(true)
  } catch {
    return Response.json(false)
  }
}

export async function GET(req: NextRequest) {
  const queries = req.nextUrl.searchParams
  const musics = await db.query.musicsTable.findMany({
    where: like(musicsTable.name, `%${queries.get('name') || ''}%`)
  })
  return Response.json(musics)
}
