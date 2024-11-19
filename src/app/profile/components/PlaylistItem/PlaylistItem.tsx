import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import styles from './PlaylistItem.module.css';

interface PlaylistItemProps {
  id: number; // Add `id` to identify the playlist
  image: string;
  name: string;
  owner: string;
  date: string;
  songCount: number;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ id, image, name, owner, date, songCount }) => {
  return (
    <Link href={`/playlist/${id}`} className={styles.linkWrapper}>
      {/* Use Next.js Link to make the entire playlist item clickable */}
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
  );
};

export default PlaylistItem;
