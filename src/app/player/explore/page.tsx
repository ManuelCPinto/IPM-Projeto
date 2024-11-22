'use client';

import React from 'react'
import ListMusicItem from '../components/Listings/ListMusicItem'
import ArtistListing from '../components/Listings/ArtistListing'

const Explore: React.FC = () => {
  const trendingSongs = [
    { id: 1, image: '/logo.png', title: 'Trending Song 1', subtitle: 'Artist 1' },
    { id: 2, image: '/FDC.jpg', title: 'Trending Song 2', subtitle: 'Fontaines DC' },
    { id: 3, image: '/logo.png', title: 'Trending Song 3', subtitle: 'Artist 3' },
  ]

  const topPlaylists = [
    { id: 1, image: '/BPAC.jpg', title: 'Global Top 50', subtitle: '50 songs' },
    { id: 2, image: '/BPAC.jpg', title: 'Chill Beats', subtitle: '30 songs' },
    { id: 3, image: '/BPAC.jpg', title: 'Workout Mix', subtitle: '40 songs' },
  ]

  const popularArtists = [
    { id: 1, image: '/Squidward.jpeg', name: 'Popular Artist 1' },
    { id: 2, image: '/Squidward.jpeg', name: 'Popular Artist 2' },
    { id: 3, image: '/Squidward.jpeg', name: 'Popular Artist 3' },
    { id: 4, image: '/Squidward.jpeg', name: 'Popular Artist 4' },
  ]

  // Click handlers
  const handleSongClick = (id: number) => {
    console.log(`Navigate to song page with id: ${id}`)
  }

  const handlePlaylistClick = (id: number) => {
    console.log(`Navigate to playlist page with id: ${id}`)
  }

  const handleArtistClick = (id: number) => {
    console.log(`Navigate to artist page with id: ${id}`)
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-white">Explore</h1>

      {/* Trending Songs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-300">Trending Songs</h2>
        <ListMusicItem
          items={trendingSongs}
          onItemClick={handleSongClick} // Add click handler for songs
        />
      </div>

      {/* Top Playlists */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-300">Top Playlists</h2>
        <ListMusicItem
          items={topPlaylists}
          onItemClick={handlePlaylistClick} // Add click handler for playlists
        />
      </div>

      {/* Popular Artists */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-300">Popular Artists</h2>
        <ArtistListing
          artists={popularArtists}
          onArtistClick={handleArtistClick} // Add click handler for artists
        />
      </div>
    </div>
  )
}

export default Explore
