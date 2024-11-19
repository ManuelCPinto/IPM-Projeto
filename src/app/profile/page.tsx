'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import userStyles from './components/UserProfile.module.css';
import artistStyles from './components/ArtistProfile.module.css';

const user = {
  profileImage: '/Squidward.jpeg',
  name: 'John Doe',
  joinDate: 'January 15, 2021',
  followers: 1000,
  weeklyListeners: 5000,
  isArtist: true,
};

const playlists = [
  { id: 1, image: '/brat.png', name: 'Favorites', owner: 'John Doe', date: 'Feb 2021', songCount: 10 },
  { id: 2, image: '/BPAC.jpg', name: 'Rock Classics', owner: 'John Doe', date: 'Mar 2021', songCount: 20 },
  { id: 3, image: '/FDC.jpg', name: 'Vibes', owner: 'John Doe', date: 'Apr 2023', songCount: 50 },
];

const artistData = {
  streams: [
    { date: '2023-01-01', streams: 10000 },
    { date: '2023-02-01', streams: 15000 },
    { date: '2023-03-01', streams: 20000 },
  ],
  countries: [
    { name: 'USA', listeners: 50000 },
    { name: 'Brazil', listeners: 30000 },
    { name: 'India', listeners: 20000 },
  ],
};

export default function ProfilePage() {
  const styles = user.isArtist ? artistStyles : userStyles;

  const displayedPlaylists = playlists.slice(0, 6);
  const handleViewMore = () => {
    console.log('View all playlists');
  };

  return (
    <div className={styles.profileContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.userProfileHeader}>
          <div className={styles.profileImageWrapper} style={{
              width: `${150}px`,
              height: `${150}px`,
            }}>
            <Image
              src={user.profileImage}
              alt={`${user.name}'s profile`}
              width={150}
              height={150}
              className={styles.profileImage}
            />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.NameDate}>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.joinDate}>Joined on {user.joinDate}</p>
            </div>
            <div className={styles.info}>
              <div className={styles.followers}>
                <span className={styles.followersLabel}>Followers: </span>
                <span className={styles.followersCount}>{user.followers}</span>
              </div>
              {user.isArtist && (
                <div className={styles.followersItem}>
                  <span className={styles.followersLabel}>Weekly Listeners: </span>
                  <span className={styles.followersCount}>{user.weeklyListeners}</span>
                </div>
              )}
            </div>
            <div className={styles.actions}>
              <button className={styles.actionButton}>Friends</button>
              <button className={styles.actionButton}>Message</button>
            </div>
            <div className={styles.settingsButton}>
                <Image
                  src="/settings.png"
                  alt="Settings"
                  width={40}
                  height={40}
                />
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Section */}
      <div className={styles.playlistSection}>
        <div className={styles.playlistList}>
          {displayedPlaylists.map((playlist) => (
            <Link key={playlist.id} href={`/playlist/${playlist.id}`} className={styles.linkWrapper}>
              <div className={styles.playlistItem}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={playlist.image}
                    alt={`${playlist.name} cover`}
                    width={100}
                    height={100}
                    className={styles.playlistImage}
                  />
                </div>
                <h3 className={styles.playlistName}>{playlist.name}</h3>
                <div className={styles.playlistDetails}>
                  <p>{playlist.owner} • {playlist.songCount} songs</p>
                  <p>Created on {playlist.date}</p>
                </div>
              </div>
            </Link>
          ))}
          <button onClick={handleViewMore} className={styles.viewMoreButton}>
            View All Playlists
          </button>
        </div>
      </div>

      {/* Artist-Specific Sections */}
      {user.isArtist && (
        <>
          <div className={styles.graphSection}>
            <div className={styles.graphContainer}>
              <h2 className={styles.title}>Streams Over Time</h2>
              <div className={styles.graph}>
                {artistData.streams.map((point, index) => (
                  <div
                    key={index}
                    className={styles.graphBar}
                    style={{ height: `${point.streams / 1000}px` }}
                  >
                    <span className={styles.label}>{point.streams}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.mapSection}>
            <div className={styles.mapContainer}>
              <h2 className={styles.title}>Audience Distribution</h2>
              <div className={styles.map}>
                {artistData.countries.map((country, index) => (
                  <div
                    key={index}
                    className={styles.country}
                    style={{ fontSize: `${country.listeners / 1000}px` }}
                  >
                    {country.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
