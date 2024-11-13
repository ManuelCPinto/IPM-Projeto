'use client';

import React from 'react';
import UserProfileHeader from './UserProfileHeader/UserProfileHeader';
import PlaylistList from './PlaylistList/PlaylistList';

interface User {
  profileImage: string;
  name: string;
  joinDate: string;
}

interface Playlist {
  id: number;
  name: string;
  owner: string;
  date: string;
  songCount: number;
}

interface UserProfileProps {
  user: User;
  playlists: Playlist[];
  onViewMorePlaylists: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, playlists, onViewMorePlaylists }) => {
  return (
    <div>
      <UserProfileHeader
        imageSrc={user.profileImage}
        name={user.name}
        joinDate={user.joinDate}
      />
      <PlaylistList playlists={playlists} onViewMore={onViewMorePlaylists} />
    </div>
  );
};

export default UserProfile;
