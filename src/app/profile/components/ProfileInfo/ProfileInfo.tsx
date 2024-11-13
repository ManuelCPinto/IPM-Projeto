import React from 'react';
import styles from './ProfileInfo.module.css';

interface ProfileInfoProps {
  name: string;
  joinDate: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, joinDate }) => {
  return (
    <div className={styles.profileInfo}>
      <h2 className={styles.userName}>{name}</h2>
      <p className={styles.joinDate}>Joined on {joinDate}</p>
    </div>
  );
};

export default ProfileInfo;
