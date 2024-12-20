'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Album, Song, User } from '@/database/schema';
import CollectionView from '@/components/CollectionView';

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
      if (!response.ok) throw new Error('Failed to fetch album data');
      const data = await response.json();

      setAlbum(data);
    } catch (error) {
      console.error('Error fetching album:', error);
      toast.error('Failed to load album details');
    }
  };

  const fetchAlbumSongs = async () => {
    try {
      const response = await fetch(`/api/albums/${albumId}/songs`);
      if (!response.ok) throw new Error('Failed to fetch album songs');
      const data: SongEntry[] = await response.json();

      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error);
      toast.error('Failed to load songs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  if (!album) return <div className="error-message">Album not found</div>;

  return (
    <CollectionView
      name={album.name}
      author={album.artist} // Ensure this field exists in your API response
      imageURL={album.cover}
      songs={songs} // Pass the SongEntry[] directly
    />
  );
}
