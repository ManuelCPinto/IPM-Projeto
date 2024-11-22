'use client';

import React from 'react'
import ListMusicItem from '../components/Listings/ListMusicItem'
import ArtistListing from '../components/Listings/ArtistListing'

const Home: React.FC = () => {
  const recentSongs = [
    { id: 1, image: '/logo.png', title: 'Trending Song 1', subtitle: 'Artist 1' },
    { id: 2, image: '/FDC.jpg', title: 'Trending Song 2', subtitle: 'Fontaines DC' },
    { id: 3, image: '/BPAC.jpg', title: 'Trending Song 3', subtitle: 'Artist 3' },
  ]

  const featuredPlaylists = [
    { id: 1, image: '/brat.png', title: 'Top Hits 2024', subtitle: '50 songs' },
    { id: 2, image: '/BPAC.jpg', title: 'Indie Favorites', subtitle: '30 songs' },
    { id: 3, image: '/logo.png', title: 'Throwback Hits', subtitle: '40 songs' },
  ]

  const trendingArtists = [
    { id: 1, image: '/Squidward.jpeg', name: 'Artist 1' },
    { id: 2, image: '/Squidward.jpeg', name: 'Artist 2' },
    { id: 3, image: '/Squidward.jpeg', name: 'Artist 3' },
    { id: 4, image: '/Squidward.jpeg', name: 'Artist 4' },
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
      <h1 className="text-3xl font-bold text-white">Home</h1>

      {/* Recently Played */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-300">Recently Played</h2>
        <ListMusicItem
          items={recentSongs}
          onItemClick={handleSongClick} // Add click handler for songs
        />
      </div>

      {/* Featured Playlists */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-300">Featured Playlists</h2>
        <ListMusicItem
          items={featuredPlaylists}
          onItemClick={handlePlaylistClick} // Add click handler for playlists
        />
      </div>

      {/* Trending Artists */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-300">Trending Artists</h2>
        <ArtistListing
          artists={trendingArtists}
          onArtistClick={handleArtistClick} // Add click handler for artists
        />
      </div>
    </div>
  )
}

export default Home
