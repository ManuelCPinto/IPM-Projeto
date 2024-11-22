import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { followsTable, usersTable } from '@/database/schema'; // Import your tables
import { eq } from 'drizzle-orm';

// GET Method: Fetch User Followers
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const username = params.id

    if (!username) {
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 })
    }

    // Query followers for the given user
    const followers = await db
      .select({
        username: usersTable.username,
        name: usersTable.name,
        email: usersTable.email,
        picture: usersTable.picture,
        type: usersTable.type,
        followers: usersTable.followers,
        monthlyListeners: usersTable.monthlyListeners,
      })
      .from(followsTable)
      .innerJoin(usersTable, eq(followsTable.follower, usersTable.username))
      .where(eq(followsTable.following, username))
      .all();

    return NextResponse.json({ success: true, followers });
  } catch (error) {
    console.error('Error fetching followers:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
