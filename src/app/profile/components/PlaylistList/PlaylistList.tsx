import React from 'react';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import styles from './PlaylistList.module.css';

interface Playlist {
  id: number;
  image: string;
  name: string;
  owner: string;
  date: string;
  songCount: number;
}

interface PlaylistListProps {
  playlists: Playlist[];
  onViewMore: () => void;
}

const PlaylistList: React.FC<PlaylistListProps> = ({ playlists, onViewMore }) => {
  // Display only the first 6 playlists
  const displayedPlaylists = playlists.slice(0, 6);

  return (
    <div className={styles.playlistList}>
      {displayedPlaylists.map((playlist) => (
        <PlaylistItem
          key={playlist.id}
          image={playlist.image}
          name={playlist.name}
          owner={playlist.owner}
          date={playlist.date}
          songCount={playlist.songCount}
        />
      ))}
      {/* Display the "View All Playlists" button as the 7th item if there are more than 6 playlists */}
        <button onClick={onViewMore} className={styles.viewMoreButton}>
          View All Playlists
        </button>
    </div>
  );
};

export default PlaylistList;
