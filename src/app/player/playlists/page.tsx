'use client';

import React from 'react'
import ListMusicItem from '../components/Listings/ListMusicItem'

const Playlists: React.FC = () => {
  const allPlaylists = [
    { id: 1, image: '/brat.png', title: 'Summer Hits', subtitle: '20 songs' },
    { id: 2, image: '/logo.png', title: 'Acoustic Vibes', subtitle: '15 songs' },
    { id: 3, image: '/brat.png', title: 'Party Anthems', subtitle: '35 songs' },
  ]

  // Click handler
  const handlePlaylistClick = (id: number) => {
    console.log(`Navigate to playlist page with id: ${id}`)
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-white">Playlists</h1>

      <ListMusicItem
        items={allPlaylists}
        onItemClick={handlePlaylistClick} // Add click handler
      />
    </div>
  )
}

export default Playlists
