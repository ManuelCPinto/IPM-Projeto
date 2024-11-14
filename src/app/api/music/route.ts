import { db } from '@/database'
import { musicsTable } from '@/database/schema'
import { NextApiRequest } from 'next'

export async function POST(req: NextApiRequest) {
  try {
    const query = req.query as Record<string, string>
    await db.insert(musicsTable).values({
      name: query.name,
      author: query.author,
      imageURL: query.imageURL,
      duration: parseInt(query.duration)
    })
    return Response.json(true)
  } catch {
    return Response.json(false)
  }
}
