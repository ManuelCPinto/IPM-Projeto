'use client';
// src/app/profile/page.tsx
import React from 'react';
import UserProfile from './components/UserProfile';

// Example user and playlists data (replace with actual data fetching if needed)
const user = {
  profileImage: '/Squidward.png',
  name: 'John Doe',
  joinDate: 'January 15, 2021',
};

const playlists = [
  { id: 1, image: '/brat.png', name: 'Favorites', owner: 'John Doe', date: 'Feb 2021', songCount: 10 },
  { id: 2, image: '/BPAC.jpg', name: 'Rock Classics', owner: 'John Doe', date: 'Mar 2021', songCount: 20 },
  { id: 3, image: '/FDC.jpg', name: 'Vibes', owner: 'John Doe', date: 'Apr 2023', songCount: 50 },
  // more playlists
];

export default function ProfilePage() {
  const handleViewMorePlaylists = () => {
    console.log('View more playlists');
  };

  return (
    <UserProfile user={user} playlists={playlists} onViewMorePlaylists={handleViewMorePlaylists} />
  );
}
