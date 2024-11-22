'use client';

import React from 'react'
import ListMusicItem from '../components/Listings/ListMusicItem'

const Albums: React.FC = () => {
  const allAlbums = [
    { id: 1, image: '/FDC.jpg', title: 'Album A', subtitle: 'Artist A' },
    { id: 2, image: '/FDC.jpg', title: 'Album B', subtitle: 'Artist B' },
    { id: 3, image: '/FDC.jpg', title: 'Album C', subtitle: 'Artist C' },
  ]

  // Click handler
  const handleAlbumClick = (id: number) => {
    console.log(`Navigate to album page with id: ${id}`)
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-white">Albums</h1>

      <ListMusicItem
        items={allAlbums}
        onItemClick={handleAlbumClick} // Add click handler
      />
    </div>
  )
}

export default Albums
