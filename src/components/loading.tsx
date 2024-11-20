'use client';

import React from 'react';
import Image from 'next/image';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center text-white">
      <Image
        src="/logo.png" // Path to your logo in the public directory
        alt="Loading..."
        width={50} // Adjust size as needed
        height={50} // Adjust size as needed
        className="animate-spin"
      />
      {message && <span className="mt-2">{message}</span>}
    </div>
  );
};

export default LoadingSpinner;
