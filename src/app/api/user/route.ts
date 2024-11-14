import { db } from '@/database'
import { User, usersTable } from '@/database/schema'
import { NextApiRequest } from 'next'

export async function POST(req: NextApiRequest) {
  try {
    await db.insert(usersTable).values(req.query as User)
    return Response.json(true)
  } catch {
    return Response.json(false)
  }
}
