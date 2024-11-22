import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { followsTable, usersTable } from '@/database/schema'; // Import your tables
import { eq } from 'drizzle-orm';

// GET Method: Fetch Users the User is Following
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const username = params.id

    if (!username) {
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 })
    }

    const following = await db
      .select({
        username: usersTable.username,
        name: usersTable.name,
        email: usersTable.email,
        picture: usersTable.picture,
        followers: usersTable.followers,
        monthlyListeners: usersTable.monthlyListeners,
      })
      .from(followsTable)
      .innerJoin(usersTable, eq(followsTable.following, usersTable.username))
      .where(eq(followsTable.follower, username))
      .all();

    return NextResponse.json({ success: true, following });
  } catch (error) {
    console.error('Error fetching following:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
