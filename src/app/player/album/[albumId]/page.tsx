'use client'

import React, { useState, useEffect } from 'react';
import '@/components/styles/playlistTable.css';
import '@/components/styles/playlistHeader.css';
import { PlaylistHeader } from "@/components/PlaylistHeader";
import { PlaylistTable } from "@/components/PlaylistTable";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Album, Song, User } from '@/database/schema';

export interface SongEntry {
  song: Song;
  artist: User;
  album: Album;
}

export default function AlbumPage() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [songs, setSongs] = useState<SongEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (albumId) {
      fetchAlbumData();
      fetchAlbumSongs();
    }
  }, [albumId]);

  const fetchAlbumData = async () => {
    try {
      const response = await fetch(`/api/albums/${albumId}`);
      if (!response.ok) throw new Error("Failed to fetch album data");
      const data = await response.json();

      setAlbum(data);
    } catch (error) {
      console.error("Error fetching album:", error);
      toast.error("Failed to load album details");
    }
  };

  const fetchAlbumSongs = async () => {
    try {
      const response = await fetch(`/api/albums/${albumId}/songs`);
      if (!response.ok) throw new Error("Failed to fetch album songs");
      const data: SongEntry[] = await response.json(); // Correctly typed as SongEntry[]

      setSongs(data); // Set songs as SongEntry[]
    } catch (error) {
      console.error("Error fetching songs:", error);
      toast.error("Failed to load songs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  if (!album) return <div className="error-message">Album not found</div>;

  return (
    <div className="main">
      <PlaylistHeader
        name={album.name}
        author={album.artist} // Assuming 'artist' is a string (username)
        imageURL={album.cover}
      />
      <PlaylistTable songs={songs} /> {/* Ensure PlaylistTable accepts SongEntry[] */}
    </div>
  );
}
