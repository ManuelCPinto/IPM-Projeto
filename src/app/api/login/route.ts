import { NextResponse } from 'next/server';
import { db } from '@/database'; // Import your database instance
import { usersTable } from '@/database/schema'; // Import the user table schema
import { eq } from 'drizzle-orm'; // Use drizzle-orm helpers
import bcrypt from 'bcrypt'; // For password hashing

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const password = searchParams.get('password');

  if (!username || !password) {
    return NextResponse.json({ success: false, message: 'Missing username or password' }, { status: 400 });
  }

  const user = await db.select().from(usersTable).where(eq(usersTable.username, username)).get();

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }

  const session = { id: user.id, username: user.username };
  return NextResponse.json({ success: true, session });
}
