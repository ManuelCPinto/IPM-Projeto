'use client';

import React from 'react';
import UserProfileHeader from './components/UserProfileHeader/UserProfileHeader';
import PlaylistList from './components/PlaylistList/PlaylistList';
import StreamsGraph from './components/StreamsGraph/StreamsGraph';
import AudienceMap from './components/AudienceMap/AudienceMap';
import userStyles from './components/UserProfile.module.css';
import artistStyles from './components/ArtistProfile.module.css';

const user = {
  profileImage: '/Squidward.jpeg',
  name: 'John Doe',
  joinDate: 'January 15, 2021',
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
  const isArtist = true; // Toggle between user and artist profile
  const styles = isArtist ? artistStyles : userStyles;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.headerSection}>
        <UserProfileHeader
          imageSrc={user.profileImage}
          name={user.name}
          joinDate={user.joinDate}
        />
      </div>

      <div className={styles.playlistSection}>
        <PlaylistList playlists={playlists} onViewMore={() => console.log('View More Playlists')} />
      </div>

      {/* Artist-Specific Sections */}
      {isArtist && (
        <>
          <div className={styles.graphSection}>
            <StreamsGraph data={artistData.streams} />
          </div>
          <div className={styles.mapSection}>
            <AudienceMap countries={artistData.countries} />
          </div>
        </>
      )}
    </div>
  );
}
