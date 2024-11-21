'use client';

import React from 'react';
import { use } from 'react';
import ProfileHeader from '../components/profileHeader';
import PlaylistGrid from '../components/playlistGrid';
import Link from 'next/link';

// Mock Data
const mockUserData = {
  id: '1',
  profileImage: '/Squidward.jpeg',
  name: 'John Doe',
  joinDate: 'January 15, 2021',
  followers: 1000,
  weeklyListeners: 5000,
  isArtist: true,
};

const mockPlaylists = [
  { id: 1, image: '/brat.png', name: 'Favorites', owner: 'John Doe', date: 'Feb 2021', songCount: 10 },
  { id: 2, image: '/BPAC.jpg', name: 'Rock Classics', owner: 'John Doe', date: 'Mar 2021', songCount: 20 },
  { id: 3, image: '/FDC.jpg', name: 'Vibes', owner: 'John Doe', date: 'Apr 2023', songCount: 50 },
];

const ProfilePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // Unwrap params

  const user = mockUserData; // Replace with API data fetching logic
  const playlists = mockPlaylists; // Replace with API data fetching logic

  return (
    <div className="flex flex-col items-center gap-8 p-8 min-h-screen bg-neutral-900 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,rgba(30,30,50,0.6),rgba(15,15,30,1),rgba(5,5,15,1))]">
      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Playlist Section */}
      <div className="w-full max-w-5xl bg-gray-900 p-6 rounded-lg shadow-md">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-white">Playlists</h3>
            <Link href={`/profile/${id}/stats`}>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-500">
                View Stats
              </button>
            </Link>
          </div>
          <PlaylistGrid playlists={playlists} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
