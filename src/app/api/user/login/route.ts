import { db } from '@/database'
import { and, eq } from 'drizzle-orm'
import { usersTable } from '@/database/schema'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const queries = req.nextUrl.searchParams
    const user = await db.query.usersTable.findFirst({
      where: and(
        eq(usersTable.username, queries.get('username') as string),
        eq(usersTable.password, queries.get('password') as string)
      )
    })
    return Response.json(Boolean(user))
  } catch {
    return Response.json(false)
  }
}
