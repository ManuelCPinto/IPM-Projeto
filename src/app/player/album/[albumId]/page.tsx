'use client'

import React, { useState, useEffect } from 'react';
import { PlaylistTable } from "@/components/PlaylistTable";
import { AlbumHeader } from "@/components/albumHeader";
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
  const [user, setUser] = useState<User>(null)
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
      setUser(data[0].artist)
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
      <AlbumHeader
        name={album.name}
        author={user.name} 
        imageURL={album.cover}
      />
      <PlaylistTable songs={songs} /> {/* Ensure PlaylistTable accepts SongEntry[] */}
    </div>
  );
}
