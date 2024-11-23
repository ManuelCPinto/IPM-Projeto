import { db } from '@/database';
import { usersTable } from '@/database/schema';
import { eq, or } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const user = await req.json();

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(
        or(eq(usersTable.username, user.username), eq(usersTable.email, user.email))
      )
      .get();

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Username or email already exists' },
        { status: 409 }
      );
    }

    await db.insert(usersTable).values({
      username: user.username,
      email: user.email,
      password: user.password, 
      name: user.name || user.username,
      type: user.type || 'user',
      picture: '/covers/default-user.png',
      followers: 0,
      following: 0,
      monthlyListeners: user.type === 'artist' ? 0 : null
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
