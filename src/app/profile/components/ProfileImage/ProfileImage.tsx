import React from 'react';
import Image from 'next/image';
import styles from './ProfileImage.module.css';
// import logo from '@/public/logo.png'


interface ProfileImageProps {
  src?: string;
  alt?: string;
  size?: number;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src = 'src/public/logo.png', alt = 'Profile Image', size = 150 }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={styles.profileImage}
      style={{ borderRadius: '50%' }}
    />
  );
};

export default ProfileImage;
