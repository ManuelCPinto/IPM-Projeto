'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/database/schema';

const FollowingSection = ({ following }: { following: User[] }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFollowing = following.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-6">
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search following..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-gray-800 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Following Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFollowing.length > 0 ? (
          filteredFollowing.map((user) => (
            <Link key={user.username} href={`/profile/${user.username}`}>
              <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-transform cursor-pointer">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500">
                  <Image
                    src={user.picture || '/default-profile.png'}
                    alt={user.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-3 text-white font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.followers} followers</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No following found.</p>
        )}
      </div>
    </div>
  );
};

export default FollowingSection;
