import React from 'react';
import styles from './ProfileInfo.module.css';

interface ProfileInfoProps {
  name: string;
  joinDate: string;
  followers: number;
  weeklyListeners: number;
  isArtist: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, joinDate, followers, weeklyListeners, isArtist }) => {
  return (
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
  );
};

export default ProfileInfo;
