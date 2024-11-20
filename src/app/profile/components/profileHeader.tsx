'use client';

import React from 'react';
import Image from 'next/image';

const ProfileHeader = ({ user }: { user: any }) => (
  <div className="w-full max-w-5xl bg-gray-900 p-6 rounded-lg shadow-md">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      {/* Profile Image */}
      <div className="w-36 h-36 flex-shrink-0 rounded-full overflow-hidden border-4 border-blue-500">
        <Image src={user.profileImage} alt={user.name} width={144} height={144} className="object-cover w-full h-full" />
      </div>
      {/* Profile Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white">{user.name}</h1>
        <p className="text-gray-400">Joined: {user.joinDate}</p>
        <div className="text-white">
          <p>Followers: {user.followers}</p>
          {user.isArtist && <p>Weekly Listeners: {user.weeklyListeners}</p>}
        </div>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
