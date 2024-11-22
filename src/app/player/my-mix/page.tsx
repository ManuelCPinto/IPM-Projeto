'use client';

import React from 'react'
import ListMusicItem from '../components/Listings/ListMusicItem'

const MyMix: React.FC = () => {
  const myMixSongs = [
    { id: 1, image: '/FDC.jpg', title: 'My Song 1', subtitle: 'Artist 1' },
    { id: 2, image: '/BPAC.jpg', title: 'My Song 2', subtitle: 'Artist 2' },
    { id: 3, image: '/FDC.jpg', title: 'My Song 3', subtitle: 'Artist 3' },
  ]

  // Click handler
  const handleSongClick = (id: number) => {
    console.log(`Navigate to song page with id: ${id}`)
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-white">My Mix</h1>

      <ListMusicItem
        items={myMixSongs}
        onItemClick={handleSongClick} // Add click handler
      />
    </div>
  )
}

export default MyMix
