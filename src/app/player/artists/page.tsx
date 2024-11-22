'use client';

import React from 'react'
import ArtistListing from '../components/Listings/ArtistListing'

const Artists: React.FC = () => {
  const allArtists = [
    { id: 1, image: '/Squidward.jpeg', name: 'Squid 1' },
    { id: 2, image: '/Squidward.jpeg', name: 'Squid 2' },
    { id: 3, image: '/Squidward.jpeg', name: 'Squid 3' },
    { id: 4, image: '/Squidward.jpeg', name: 'Squid 4' },
    { id: 5, image: '/Squidward.jpeg', name: 'Squid 5' },
    { id: 6, image: '/Squidward.jpeg', name: 'Squid 6' },
  ]

  const handleArtistClick = (id: number) => {
    console.log(`Navigate to artist page with id: ${id}`)
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-white">Artists</h1>
      <ArtistListing
        artists={allArtists}
        onArtistClick={handleArtistClick} // Add click handler for artists
      />
    </div>
  )
}

export default Artists
