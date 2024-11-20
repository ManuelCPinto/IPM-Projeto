'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Album, Genre, Descriptor } from '@/database/schema'

interface NewReleasesProps {
  Albums: (Album & { genres: Genre[]; descriptors: Descriptor[] })[] | null
  error: string | null
  loading: boolean
}

const NewReleases: React.FC<NewReleasesProps> = ({ Albums, error }) => {
  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  if (!Albums || Albums.length === 0) {
    return <div className="text-white"></div>
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-h-[800px] space-y-6">
      <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-2">New Releases</h2>
      <div className="space-y-4">
        {Albums.map((album) => (
          <Link key={album.albumId} href={`/player/ratings/albums/${album.albumId}`} passHref>
            <div className="flex items-start gap-4 hover:bg-gray-700 p-4 rounded-lg transition cursor-pointer">
              {/* Album Cover */}
              <Image
                src={album.cover}
                alt={`${album.name} cover`}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded-lg shadow-md"
              />

              {/* Album Info */}
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg hover:underline">{album.name}</h3>
                <p className="text-gray-400 text-sm">
                  <span className="block">{album.artist}</span>
                  <span>{album.releaseDate}</span>
                </p>
                <p className="text-gray-500 text-sm mt-1">{album.genres.join(', ')}</p>
                <p className="text-gray-500 text-sm mt-1">{album.descriptors.join(', ')}</p>
              </div>

              {/* Stats */}
              <div className="flex flex-col items-end">
                <span className="text-blue-400 font-bold text-lg">{album.rating.toFixed(2)}</span>
                <div className="text-gray-500 text-xs mt-1">
                  <span>{album.rated.toLocaleString()} rated</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Releases Button */}
      <Link href="/player/ratings/albums">
        <button className="mt-4 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition w-full">
          View All Releases
        </button>
      </Link>
    </div>
  )
}

export default NewReleases
