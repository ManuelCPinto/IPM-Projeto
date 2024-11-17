import React from 'react';
import Image from 'next/image';
import styles from './PlaylistItem.module.css';

interface PlaylistItemProps {
  image: string;
  name: string;
  owner: string;
  date: string;
  songCount: number;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ image, name, owner, date, songCount }) => {
  return (
    <div className={styles.playlistItem}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={`${name} cover`}
          width={100}  // Fixed size for square image
          height={100} // Fixed size for square image
          className={styles.playlistImage}
        />
      </div>
      <h3 className={styles.playlistName}>{name}</h3>
      <div className={styles.playlistDetails}>
        <p>{owner} • {songCount} songs </p>
        <p>Created on {date}</p>
      </div>
    </div>
  );
};

export default PlaylistItem;
