import { db } from '@/database'
import { User, usersTable } from '@/database/schema'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const user = (await req.json()) as User
    const res = await db.insert(usersTable).values(user)
    return Response.json(res.rowsAffected > 0)
  } catch {
    return Response.json(false)
  }
}
