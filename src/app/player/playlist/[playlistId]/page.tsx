'use client';

import React, { useState, useEffect } from 'react';
import '@/components/styles/playlistTable.css';
import '@/components/styles/playlistHeader.css';
import { PlaylistHeader } from "@/components/PlaylistHeader";
import { PlaylistTable } from "@/components/PlaylistTable";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Playlist, Song } from '@/database/schema';

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playlistId) return;
    fetchPlaylistData();
  }, [playlistId]);

  const fetchPlaylistData = async () => {
    try {
      // Fetch the playlist details
      const playlistResponse = await fetch(`/api/playlist/${playlistId}`);
      if (!playlistResponse.ok) throw new Error('Failed to fetch playlist');
      const playlistData = await playlistResponse.json();

      if (playlistData.playlists?.length > 0) {
        setPlaylist(playlistData.playlists[0]);
      } else {
        throw new Error('Playlist not found');
      }

      // Fetch the songs associated with the playlist
      const songsResponse = await fetch(`/api/playlist/${playlistId}/songs`);
      if (!songsResponse.ok) throw new Error('Failed to fetch songs');
      const songsData: Song[] = await songsResponse.json();

      setSongs(songsData); // Set songs directly from the API
    } catch (error) {
      console.error('Error fetching playlist or songs:', error);
      toast.error('Failed to load playlist.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!playlist) return <div>Playlist not found</div>;

  return (
    <div className="main">
      <PlaylistHeader
        name={playlist.name}
        author={playlist.author}
        imageURL={playlist.cover || '/default-cover.png'} // Default cover if none exists
      />
      <PlaylistTable songs={songs} />
    </div>
  );
}
