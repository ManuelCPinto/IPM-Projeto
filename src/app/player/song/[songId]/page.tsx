'use client';

import React, { useState, useEffect } from 'react';
import '@/components/styles/playlistTable.css';
import '@/components/styles/playlistHeader.css';
import { PlaylistHeader } from "@/components/PlaylistHeader";
import { PlaylistTable } from "@/components/PlaylistTable";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Song, User, Album } from '@/database/schema';

export interface SongEntry {
  song: Song;
  artist: User;
  album: Album;
}

export default function SongPage() {
  const { songId } = useParams();
  const [songEntry, setSongEntry] = useState<SongEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (songId) {
      fetchSongData();
    }
  }, [songId]);

  const fetchSongData = async () => {
    try {
      const response = await fetch(`/api/song/${songId}`);
      if (!response.ok) throw new Error("Failed to fetch song data");
      const data: SongEntry = await response.json(); // Correctly typed as SongEntry

      setSongEntry(data);
    } catch (error) {
      console.error("Error fetching song:", error);
      toast.error("Failed to load song details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  if (!songEntry) return <div className="error-message">Song not found</div>;

  return (
    <div className="main">
      <PlaylistHeader
        name={songEntry.song.name}
        author={songEntry.artist.name} 
        imageURL={songEntry.album.cover}
      />
      <PlaylistTable songs={[songEntry]} /> 
    </div>
  );
}
