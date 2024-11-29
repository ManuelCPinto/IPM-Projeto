'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { PlaylistTable } from '@/components/PlaylistTable';
import { FaRegHeart } from 'react-icons/fa';
import { Album, Song, User } from '@/database/schema';

export interface SongEntry {
  song: Song;
  artist: User;
  album: Album;
}

const LikedSongsPage = () => {
  const [likedSongs, setLikedSongs] = useState<SongEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          toast.error('User not logged in');
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);

        const response = await fetch(`/api/like?userId=${user.username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch liked songs');
        }

        const data = await response.json();
        const songsData: SongEntry[] = data.likedSongs || []; // Ensure data is SongEntry[]
        setLikedSongs(songsData);
      } catch (error) {
        console.error('Error fetching liked songs:', error);
        toast.error('Failed to load liked songs');
      } finally {
        setLoading(false);
      }
    };

    fetchLikedSongs();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400">Loading liked songs...</div>;
  }

  if (likedSongs.length === 0) {
    return <div className="text-center text-gray-400">No liked songs found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 rounded-lg">
            <FaRegHeart className="text-white w-16 h-16" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white">Liked Songs</h1>
          <p className="text-gray-400 text-sm">A collection of your favorite tracks</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <PlaylistTable songs={likedSongs} />
      </div>
    </div>
  );
};

export default LikedSongsPage;
