import React from 'react';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import styles from './PlaylistList.module.css';

interface Playlist {
  id: number;
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
  return (
    <div className={styles.playlistList}>
      {playlists.map((playlist) => (
        <PlaylistItem
          key={playlist.id}
          name={playlist.name}
          owner={playlist.owner}
          date={playlist.date}
          songCount={playlist.songCount}
        />
      ))}
      <button onClick={onViewMore} className={styles.viewMoreButton}>
        View All Playlists
      </button>
    </div>
  );
};

export default PlaylistList;
