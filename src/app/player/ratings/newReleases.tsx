'use client';
import React from 'react';
import albumData from './albumData';

const NewReleases: React.FC = () => {
  const releases = albumData.filter((album) => !album.review);

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-h-[640px] space-y-6">
      <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-2">
        New Releases
      </h2>

      {/* Release Items */}
      <div className="space-y-4">
        {releases.map((release) => (
          <div
            key={release.id}
            className="flex items-start gap-4 hover:bg-gray-700 p-4 rounded-lg transition">
            {/* Album Cover */}
            <img
              src={release.cover}
              alt={`${release.name} cover`}
              className="w-16 h-16 object-cover rounded-lg shadow-md"
            />

            {/* Album Info */}
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">{release.name}</h3>
              <p className="text-gray-400 text-sm">
                <span className="block">{release.artist}</span>
                <span>{release.releaseDate}</span>
              </p>
              <p className="text-gray-500 text-sm mt-1">{release.genres.join(', ')}</p>
            </div>

            {/* Stats */}
            <div className="flex flex-col items-end">
              <span className="text-blue-400 font-bold text-lg">
                {release.rating.toFixed(2)}
              </span>
              <div className="text-gray-500 text-xs mt-1">
                <span>{release.rated.toLocaleString()} rated</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Features Button */}
      <button className="mt-4 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition w-full">
        View All Releases
      </button>
    </div>
  );
};

export default NewReleases;
