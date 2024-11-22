'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const PlaylistGrid = ({ playlists }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {playlists.map((playlist) => (
      <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
        <div className="bg-neutral-900 p-4 rounded-lg shadow hover:shadow-xl transition-transform cursor-pointer">
          <div className="w-full h-48 relative">
            <Image src={playlist.image} alt={playlist.name} layout="fill" objectFit="cover" className="rounded-md" />
          </div>
          <h2 className="text-xl font-semibold text-white mt-4">{playlist.name}</h2>
          <p className="text-gray-400">{playlist.owner}</p>
          <p className="text-gray-500">{playlist.songCount} songs</p>
        </div>
      </Link>
    ))}
  </div>
)

export default PlaylistGrid
