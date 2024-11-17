import React from 'react';
import Image from 'next/image';
import styles from './ProfileImage.module.css';

interface ProfileImageProps {
  src: string;
  alt?: string;
  size?: number;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src , alt = 'Profile Image', size = 150 }) => {
  return (
    <div
      className={styles.profileImageWrapper}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={styles.profileImage}
      />
    </div>
  );
};

export default ProfileImage;
