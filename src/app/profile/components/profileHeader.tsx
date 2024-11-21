'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProfileHeader = ({ user }: { user: any }) => (
  <div className="w-full max-w-5xl bg-gray-900 p-6 rounded-lg shadow-md relative">
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
    {/* Settings Button */}
    <Link href={`/profile/${user.id}/settings`}>
      <div className="absolute top-6 right-6 cursor-pointer">
        <Image
          src="/Settings.png" // Replace with your cogwheel image path
          alt="Settings"
          width={32}
          height={32}
          className="hover:opacity-80 transition-opacity"
        />
      </div>
    </Link>
  </div>
);

export default ProfileHeader;
