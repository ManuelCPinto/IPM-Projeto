import React from 'react';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import styles from './UserProfileHeader.module.css';
import ProfileImage from '../ProfileImage/ProfileImage';

interface UserProfileHeaderProps {
  imageSrc: string;
  name: string;
  joinDate: string;
  followers: number;
  weeklyListeners: number;
  isArtist: boolean;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ imageSrc, name, joinDate, followers, weeklyListeners, isArtist }) => {
  return (
    <div className={styles.userProfileHeader}>
      <ProfileImage src={imageSrc} size={150} />
      <ProfileInfo name={name} joinDate={joinDate} followers={followers} weeklyListeners={weeklyListeners} isArtist={isArtist} />
    </div>
  );
};

export default UserProfileHeader;
