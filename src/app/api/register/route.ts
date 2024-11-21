import { NextResponse } from 'next/server';
import { db } from '@/database';
import { usersTable } from '@/database/schema';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ success: false, message: 'Missing username or password' }, { status: 400 });
  }

  const existingUser = await db.select().from(usersTable).where(eq(usersTable.username, username)).get();

  if (existingUser) {
    return NextResponse.json({ success: false, message: 'Username already exists' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(usersTable).values({ username, password: hashedPassword });

  return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
}
