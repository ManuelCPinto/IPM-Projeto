import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { usersTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const results = await db
      .select({
        name: usersTable.name,
        username: usersTable.username,
      })
      .from(usersTable)
      .where(eq(usersTable.type, 'artist'));

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
