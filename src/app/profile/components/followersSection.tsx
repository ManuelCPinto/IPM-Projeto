'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const FollowersSection = ({ followers }: { followers: Array<{ id: number; profileImage: string; name: string; followers: number }> }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFollowers = followers.filter((follower) =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-6">
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search followers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-gray-800 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Followers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFollowers.length > 0 ? (
          filteredFollowers.map((follower) => (
            <div key={follower.id} className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-transform">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-600">
                <Image src={follower.profileImage} alt={follower.name} width={80} height={80} className="object-cover" />
              </div>
              <h3 className="mt-3 text-white font-semibold">{follower.name}</h3>
              <p className="text-sm text-gray-400">{follower.followers} followers</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No followers found.</p>
        )}
      </div>
    </div>
  );
};

export default FollowersSection;
