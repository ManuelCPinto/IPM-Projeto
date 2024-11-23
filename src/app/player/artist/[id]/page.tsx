'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { User, Song, Album } from '@/database/schema'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import LoadingSpinner from '@/components/loading'
import { LikeButton } from '@/components/LikeButton'

export default function ArtistPage() {
  const { id: username } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [artist, setArtist] = useState<User | null>(null)
  const [songs, setSongs] = useState<Song[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      toast.error("User not logged in");
    }
    if (username) {
      fetchArtistData(username as string)
    } else {
      console.error('Username not found in URL parameters')
      setLoading(false)
    }
  }, [username])

  const fetchArtistData = async (username: string) => {
    try {
      const response = await fetch(`/api/artist/${username}`)
      if (!response.ok) {
        throw new Error('Failed to fetch artist data')
      }
      const data = await response.json()

      setArtist(data.artist)
      setSongs(data.songs.slice(0, 5))
      setAlbums(data.albums)
    } catch (error) {
      console.error('Error fetching artist data:', error)
      toast.error('Failed to load artist information.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
        <p className="mt-4 text-white">Loading artist information...</p>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white">Artist not found</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header Section */}
      <header className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-8 w-full">
        <div className="flex items-center space-x-6">
          <Image
            src={artist.picture || '/default-profile.png'}
            alt={`${artist.name}'s profile picture`}
            width={200}
            height={200}
            className="rounded-full shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold">{artist.name}</h1>
            <p className="text-sm text-gray-400 mt-2">{artist.email || 'No biography available.'}</p>
            <p className="text-sm text-gray-400 mt-1">
              {artist.followers} followers • {artist.monthlyListeners} monthly listeners
            </p>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700"></div>
      </header>

      {/* Top Songs Section */}
      <section className="p-10 bg-gradient-to-b from-gray-900 to-gray-800">
        <h2 className="text-2xl font-bold mb-4">Top Songs</h2>
        <div className="space-y-4">
          {songs.map((song, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition"
            >
              <button className="w-10 h-10 bg-blue-600 rounded-full flex justify-center items-center mr-4">▶</button>
              <div className="flex-grow flex justify-between items-center">
                <div>
                  <p className="font-semibold">{song.name}</p>
                  <p className="text-sm text-gray-400">{song.albumId}</p>
                </div>
                <p className="text-sm text-gray-400">{song.duration}</p>
              </div>
              <LikeButton
                songId={song.id}
                userId={user.username} 
                initialLiked={false}/>            
                </div>
          ))}
        </div>
      </section>

      {/* Albums Section */}
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {albums.map((album, index) => (
            <Link href={`/player/album/${album.id}`} key={index}>
              <div
                className="flex flex-col items-center bg-gray-800 p-3 rounded-md shadow-lg hover:bg-gray-700 transition"
                style={{ width: '180px' }}
              >
                <Image
                  src={album.cover || '/default-album.png'}
                  alt={`Cover of ${album.name}`}
                  width={150}
                  height={150}
                  className="rounded-lg mb-2"
                />
                <p className="text-center font-semibold text-sm">{album.name}</p>
                <p className="text-center text-xs text-gray-400">{album.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
