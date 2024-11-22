import { NextResponse } from 'next/server';
import { db } from '@/database';
import { usersTable } from '@/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const password = searchParams.get('password');

  if (!username || !password) {
    return NextResponse.json(
      { success: false, message: 'Missing username or password' },
      { status: 400 }
    );
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .get();

  if (!user) {
    return NextResponse.json(
      { success: false, message: 'User not found' },
      { status: 404 }
    );
  }

  // Check if the password matches (since no hashing is involved)
  if (password !== user.password) {
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  }

  // Return the full user object
  return NextResponse.json({ success: true, user });
}
