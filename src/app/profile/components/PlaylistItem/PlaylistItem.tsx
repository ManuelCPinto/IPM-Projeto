import React from 'react';
import styles from './PlaylistItem.module.css';

interface PlaylistItemProps {
  name: string;
  owner: string;
  date: string;
  songCount: number;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ name, owner, date, songCount }) => {
  return (
    <div className={styles.playlistItem}>
      <h3 className={styles.playlistName}>{name}</h3>
      <p className={styles.playlistDetails}>
        {owner} • {songCount} songs • Created on {date}
      </p>
    </div>
  );
};

export default PlaylistItem;
