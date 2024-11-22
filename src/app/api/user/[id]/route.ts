import { NextResponse, NextRequest } from 'next/server'
import { db } from '@/database'
import { usersTable } from '@/database/schema'
import { eq } from 'drizzle-orm'

// GET User Profile by ID
export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 })
    }

    // Fetch user profile
    const user = await db.select().from(usersTable).where(eq(usersTable.username, id)).get()

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, user: user })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
