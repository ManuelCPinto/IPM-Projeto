/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import Image from 'next/image';

const ProfileHeader = ({ user }: { user: any }) => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-md flex items-center space-x-6 mb-8">
    {/* Profile Image */}
    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500">
      <Image src={user.profileImage} alt={user.name} width={144} height={144} className="object-cover" />
    </div>
    {/* User Info */}
    <div>
      <h1 className="text-3xl font-bold">{user.name}</h1>
      <p className="text-gray-400">Joined: {user.joinDate}</p>
      <div className="text-gray-300 mt-2">
        <p>Followers: {user.followers}</p>
        {user.isArtist && <p>Monthly Listeners: {user.monthlyListeners}</p>}
      </div>
    </div>
  </div>
);

export default ProfileHeader;
