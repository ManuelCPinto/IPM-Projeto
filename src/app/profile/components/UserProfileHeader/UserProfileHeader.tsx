import React from 'react';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import styles from './UserProfileHeader.module.css';
import ProfileImage from '../ProfileImage/ProfileImage';

interface UserProfileHeaderProps {
  imageSrc: string;
  name: string;
  joinDate: string;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ imageSrc, name, joinDate }) => {
  return (
    <div className={styles.userProfileHeader}>
      <ProfileImage src={imageSrc} size={150} />
      <ProfileInfo name={name} joinDate={joinDate} />
    </div>
  );
};

export default UserProfileHeader;
