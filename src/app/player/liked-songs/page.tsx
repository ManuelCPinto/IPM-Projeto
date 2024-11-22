'use client'

import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import '@/components/styles/PlaylistTable.css';
import { PlaylistTable } from "@/components/PlaylistTable";

// Example data for liked songs
const likedSongs = [
  { name: 'Song 1', author: 'Artist 1', album: 'Album 1', duration: '3:45' },
  { name: 'Song 2', author: 'Artist 2', album: 'Album 2', duration: '4:20' },
  { name: 'Song 3', author: 'Artist 3', album: 'Album 3', duration: '5:10' },
];

const LikedSongsPage = () => {
  return (
    <div className="p-6 space-y-6"> {/* Main container */}
      {/* Header Section */}
      <div className="flex items-center space-x-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 rounded-lg">
            <FaRegHeart className="text-white w-16 h-16" />
          </div>
        </div>
        {/* Header Info */}
        <div>
          <h1 className="text-4xl font-bold text-white">Liked Songs</h1>
          <p className="text-gray-400 text-sm">A collection of your favorite tracks</p>
        </div>
      </div>

      {/* Playlist Table */}
      <div className="bg-gray-800 rounded-lg p-4">
        <PlaylistTable songs={likedSongs} />
      </div>
    </div>
  );
};

export default LikedSongsPage;
