import { db } from '@/database'
import { User, usersTable } from '@/database/schema'
import { eq, or } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming user object
    const user = (await req.json()) as User

    // Check if username or email already exists
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(or(eq(usersTable.username, user.username), eq(usersTable.email, user.email)))
      .get()

    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Username or email already exists' }, { status: 409 })
    }

    await db.insert(usersTable).values({
      username: user.username,
      email: user.email,
      password: user.password,
      name: user.name || user.username,
      picture: 'covers/manuel.png',
      followers: 0,
      following: 0,
      monthlyListeners: 0
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
