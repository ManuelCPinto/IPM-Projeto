// src/app/api/user/[id]/follow/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { followsTable, usersTable } from '@/database/schema'
import { db } from '@/database'
import { and, eq, sql } from 'drizzle-orm'

export async function POST(req: NextRequest, { params }) {
  try {
    const follower = req.headers.get('x-username') // Assume the logged-in username is passed in headers
    const following = params.id // The user being followed

    if (!follower || !following) {
      return NextResponse.json({ success: false, message: 'Follower and following are required' }, { status: 400 })
    }

    // Insert the follow relationship
    await db.transaction(async (trx) => {
      await trx.insert(followsTable).values({
        follower,
        following
      })

      // Increment the follower count for the followed user
      await trx
        .update(usersTable)
        .set({ followers: sql`${usersTable.followers} + 1` })
        .where(eq(usersTable.username, following))

      // Increment the following count for the follower
      await trx
        .update(usersTable)
        .set({ following: sql`${usersTable.following} + 1` })
        .where(eq(usersTable.username, follower))
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating follow relationship:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }) {
  try {
    const follower = req.headers.get('x-username') // Assume the logged-in username is passed in headers
    const following = params.id // The user being unfollowed

    if (!follower || !following) {
      return NextResponse.json({ success: false, message: 'Follower and following are required' }, { status: 400 })
    }

    // Delete the follow relationship
    await db.transaction(async (trx) => {
      const result = await trx
        .delete(followsTable)
        .where(and(eq(followsTable.follower, follower), eq(followsTable.following, following)))

      if (result.rowsAffected === 0) {
        throw new Error('No follow relationship found')
      }

      // Decrement the follower count for the unfollowed user
      await trx
        .update(usersTable)
        .set({ followers: sql`${usersTable.followers} - 1` })
        .where(eq(usersTable.username, following))

      // Decrement the following count for the follower
      await trx
        .update(usersTable)
        .set({ following: sql`${usersTable.following} - 1` })
        .where(eq(usersTable.username, follower))
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting follow relationship:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
