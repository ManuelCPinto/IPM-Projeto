'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Album, Playlist, Song, User } from '@/database/schema';
import CollectionView from '@/components/CollectionView';

interface SongEntry {
  song: Song;
  artist: User;
  album: Album;
}

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [songs, setSongs] = useState<SongEntry[]>([]);
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
      const songsData: SongEntry[] = await songsResponse.json(); // Correctly typed as SongEntry[]

      setSongs(songsData); // Set songs as SongEntry[]
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
    <CollectionView
      name={playlist.name}
      author={playlist.author}
      imageURL={playlist.cover || '/default-cover.png'}
      songs={songs} // Pass the SongEntry[] directly
      currentPlaylistId={playlist.id} 
    />
  );
}
