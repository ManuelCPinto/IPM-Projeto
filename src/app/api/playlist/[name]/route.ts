import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { playlistTable, songsTable, playlistSongsTable } from '@/database/schema';
import { and, eq } from 'drizzle-orm';

export async function GET(req: NextRequest, context ) {
  try {
    const { name: playlistId } = context.params;
    if (!playlistId) {
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 })
    }

    const playlists = await db.select().from(playlistTable).where(eq(playlistTable.id, parseInt(playlistId))).all()

    return NextResponse.json({ success: true, playlists })
  } catch (error) {
    console.error('Error fetching playlists:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest, context ) {
  try {
    const { name: playlistId } = context.params;
    const { songId } = await req.json();

    console.log("song id to add " + { songId });

    if (!songId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const album = await db
      .select()
      .from(playlistTable)
      .where(eq(playlistTable.id, parseInt(playlistId)))
      .get()

    if (!album) {
      return NextResponse.json({ error: 'Playlist not found' }, { status: 404 });
    }

    const song = await db
      .select()
      .from(songsTable)
      .where(eq(songsTable.id, songId))
      .get();

    if (!song) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    }

    const exists = await db
      .select()
      .from(playlistSongsTable)
      .where(
        and(
          eq(playlistSongsTable.playlistId, parseInt(playlistId)),
          eq(playlistSongsTable.songId, songId)
        )
      )
      .get();
    
    if (exists) {
      //remove song from playlist
      await db
        .delete(playlistSongsTable)
        .where(
          and(
            eq(playlistSongsTable.playlistId, parseInt(playlistId)),
            eq(playlistSongsTable.songId, songId)
          )
      );
    } else {
      //add song to playlist
      await db
        .insert(playlistSongsTable)
        .values({
        playlistId: parseInt(playlistId),
        songId,
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error inserting review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
