'use client';

import React from 'react';
import UserProfileHeader from './UserProfileHeader/UserProfileHeader';
import PlaylistList from './PlaylistList/PlaylistList';
import styles from './UserProfile.module.css';

interface User {
  profileImage: string;
  name: string;
  joinDate: string;
}

interface Playlist {
  id: number;
  image: string;
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
    <div className={styles.userProfileContainer}>
      <div className={styles.headerSection}>
        <UserProfileHeader
          imageSrc={user.profileImage}
          name={user.name}
          joinDate={user.joinDate}
        />
      </div>
      
      <div className={styles.playlistSection}>
        <PlaylistList playlists={playlists} onViewMore={onViewMorePlaylists} />
      </div>

      {/* Placeholder for additional sections */}
      <div className={styles.additionalSection}>
        {/* Additional components can be added here */}
      </div>
    </div>
  );
};

export default UserProfile;
