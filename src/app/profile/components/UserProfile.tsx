'use client';

import React from 'react';
import UserProfileHeader from './UserProfileHeader/UserProfileHeader';
import PlaylistList from './PlaylistList/PlaylistList';
import styles from './UserProfile.module.css';
import Image from 'next/image';
import Link from 'next/link'; 

interface User {
  profileImage: string;
  name: string;
  joinDate: string;
  followers: number;
  weeklyListeners: number;
  isArtist: boolean;
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
        <div className={styles.userProfileHeader}>
        <div className={styles.profileImageWrapper}
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={size}
              height={size}
              className={styles.profileImage}
            />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.NameDate}>
              <h2 className={styles.userName}>{name}</h2>
              <p className={styles.joinDate}>Joined on {joinDate}</p>
            </div>
            <div className={styles.info}>
              <div className={styles.followers}>
                <span className={styles.followersLabel}>Followers: </span>
                <span className={styles.followersCount}>{followers}</span>
              </div>
              {isArtist && (
                <>
                <div className={styles.followersItem}>
                  <span className={styles.followersLabel}>Weekly Listeners: </span>
                  <span className={styles.followersCount}>{weeklyListeners}</span> 
                </div>
                </>
              )}
            </div>
            <div className={styles.actions}>
              <button className={styles.actionButton}>Friends</button>
              <button className={styles.actionButton}>Message</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.playlistSection}>
          <div className={styles.playlistList}>
          {displayedPlaylists.map((playlist) => (
            <Link href={`/playlist/${id}`} className={styles.linkWrapper}>

              <div className={styles.playlistItem}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={image}
                    alt={`${name} cover`}
                    width={100} 
                    height={100}
                    className={styles.playlistImage}
                  />
                </div>
                <h3 className={styles.playlistName}>{name}</h3>
                <div className={styles.playlistDetails}>
                  <p>{owner} • {songCount} songs</p>
                  <p>Created on {date}</p>
                </div>
              </div>
            </Link>
            ))}
          {/* Display the "View All Playlists" button as the 7th item if there are more than 6 playlists */}
          <button onClick={onViewMore} className={styles.viewMoreButton}>
            View All Playlists
          </button>
        </div>
      </div>

      {/* Placeholder for additional sections */}
      <div className={styles.additionalSection}>
        {/* Additional components can be added here */}
      </div>
    </div>
  );
};

export default UserProfile;
