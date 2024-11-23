import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { albumsTable, likesTable, songsTable, usersTable } from '@/database/schema';
import { and, eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { songId, userId } = await req.json();

    // Add a like
    await db.insert(likesTable).values({ songId, userId }).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error liking the song:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to like the song' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { songId, userId } = await req.json();

    // Remove a like
    await db
      .delete(likesTable)
      .where(and(eq(likesTable.songId, songId), eq(likesTable.userId, userId)))
      .run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error unliking the song:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to unlike the song' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get('userId');
  
      if (!userId) {
        return NextResponse.json(
          { success: false, message: 'User ID is required' },
          { status: 400 }
        );
      }
  
      // Fetch liked songs for the user, including artist and album details
      const likedSongs = await db
        .select({
            song: songsTable,
            artist: usersTable.name,
            album: albumsTable.name,
        })
        .from(likesTable)
        .leftJoin(songsTable, eq(likesTable.songId, songsTable.id))
        .leftJoin(usersTable, eq(songsTable.author, usersTable.username))
        .leftJoin(albumsTable, eq(songsTable.albumId, albumsTable.id))
        .where(eq(likesTable.userId, userId))
        .all();
      
      return NextResponse.json({ success: true, likedSongs: likedSongs });
    } catch (error) {
      console.error('Error fetching liked songs:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch liked songs' },
        { status: 500 }
      );
    }
  }