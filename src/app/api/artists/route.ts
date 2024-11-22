import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/database'
import { usersTable } from '@/database/entities/user'
import { and, eq, like, sql } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('query')
    const limit = searchParams.get('limit')

    const results = await db
      .select()
      .from(usersTable)
      .where(and(eq(usersTable.type, 'artist'), like(usersTable.name, `%${query}%`)))
      .limit(limit ? parseInt(limit) : undefined)
      .orderBy(sql`RANDOM()`)

    return NextResponse.json(results)
  } catch {
    return NextResponse.json(null)
  }
}
