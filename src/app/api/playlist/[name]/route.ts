import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { playlistTable, songsTable, playlistSongsTable } from '@/database/schema';
import { and, eq } from 'drizzle-orm';

export async function GET(req: NextRequest, context) {
  try {
    const { name: playlistId } = context.params;
    if (!playlistId) {
      return NextResponse.json({ success: false, message: 'Playlist ID is required' }, { status: 400 });
    }

    const playlists = await db.select().from(playlistTable).where(eq(playlistTable.id, parseInt(playlistId))).all();

    return NextResponse.json({ success: true, playlists });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, context) {
  try {
    const { name: playlistId } = context.params;
    const { songId } = await req.json();

    if (!playlistId || !songId) {
      return NextResponse.json(
        { error: 'Missing required fields: playlistId or songId' },
        { status: 400 }
      );
    }

    const playlist = await db
      .select()
      .from(playlistTable)
      .where(eq(playlistTable.id, parseInt(playlistId)))
      .get();

    if (!playlist) {
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
      return NextResponse.json({ error: 'Song already exists in the playlist' }, { status: 400 });
    }

    // Add song to playlist
    await db
      .insert(playlistSongsTable)
      .values({
        playlistId: parseInt(playlistId),
        songId,
      });

    return NextResponse.json({ success: true, message: 'Song added to playlist' }, { status: 201 });
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context) {
  try {
    const { name: playlistId } = context.params;
    const { songId } = await req.json();

    if (!playlistId || !songId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log(`Removing song ${songId} from playlist ${playlistId}`);

    await db
      .delete(playlistSongsTable)
      .where(
        and(
          eq(playlistSongsTable.playlistId, parseInt(playlistId)),
          eq(playlistSongsTable.songId, songId)
        )
      );

    return NextResponse.json({ success: true, message: 'Song removed from playlist' }, { status: 200 });
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
