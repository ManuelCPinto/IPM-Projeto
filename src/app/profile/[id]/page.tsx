'use client';

import React, { useState } from 'react';
import ProfileHeader from '../components/profileHeader';
import PlaylistCarousel from '../components/playlistCarousel';
import Link from 'next/link';
import FollowersSection from '../components/followersSection';
import FollowingSection from '../components/followingSection';

const mockUserData = {
  id: '1',
  profileImage: '/Squidward.jpeg',
  name: 'John Doe',
  joinDate: 'January 15, 2021',
  followers: 1000,
  monthlyListeners: 5000,
  isArtist: true,
};

const mockPlaylists = [
  { id: 1, image: '/brat.png', name: 'Favorites', owner: 'John Doe', songCount: 10 },
  { id: 2, image: '/BPAC.jpg', name: 'Rock Classics', owner: 'John Doe', songCount: 20 },
  { id: 3, image: '/FDC.jpg', name: 'Vibes', owner: 'John Doe', songCount: 50 },
  { id: 4, image: '/playlist4.jpg', name: 'Chill Hits', owner: 'John Doe', songCount: 15 },
  { id: 5, image: '/playlist5.jpg', name: 'Workout Jams', owner: 'John Doe', songCount: 25 },
];

const mockFollowers = [
  { id: 1, profileImage: '/profile1.jpg', name: 'Alice Smith', followers: 120 },
  { id: 2, profileImage: '/profile2.jpg', name: 'Bob Johnson', followers: 98 },
  { id: 3, profileImage: '/profile3.jpg', name: 'Charlie Brown', followers: 45 },
  { id: 4, profileImage: '/profile4.jpg', name: 'David Kim', followers: 75 },
];

const mockFollowing = [
  { id: 1, profileImage: '/profile5.jpg', name: 'Eve Martinez', followers: 89 },
  { id: 2, profileImage: '/profile6.jpg', name: 'Franklin Chen', followers: 300 },
  { id: 3, profileImage: '/profile7.jpg', name: 'Grace Hopper', followers: 450 },
  { id: 4, profileImage: '/profile8.jpg', name: 'Henry Ford', followers: 200 },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Public Playlists');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-neutral-900 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,rgba(30,30,50,0.6),rgba(15,15,30,1),rgba(5,5,15,1))] shadow-lg text-white p-8">
      {/* Profile Header */}
      <div className="relative">
        <ProfileHeader user={mockUserData} />
        {/* Buttons inside Header */}
        <div className="absolute top-6 right-6 flex gap-4">
          <Link href={`/profile/${mockUserData.id}/stats`}>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold">
              View Statistics
            </button>
          </Link>
          <Link href={`/profile/${mockUserData.id}/settings`}>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-semibold">
              Profile Settings
            </button>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-8 border-b border-gray-700 pb-2 mt-8">
        {['Public Playlists', 'Following', 'Followers'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`text-lg font-semibold transition-all ${
              activeTab === tab
                ? 'text-white border-b-2 border-blue-700'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      {activeTab === 'Public Playlists' && (
        <div className="space-y-8 mt-6">
          {/* Playlist Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Public Playlists</h3>
              <Link href={`/profile/${mockUserData.id}/stats`}>
                <button className="px-4 py-2 bg-blue-600 rounded-md hover:bg-purple-700 transition">
                  See All
                </button>
              </Link>
            </div>
            <PlaylistCarousel playlists={mockPlaylists} />
          </div>
        </div>
      )}

      {activeTab === 'Following' && <FollowingSection following={mockFollowing} />}
      {activeTab === 'Followers' && <FollowersSection followers={mockFollowers} />}
    </div>
  );
};

export default ProfilePage;
