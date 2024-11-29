'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import PlayButton from '@/components/PlayButton';
import { LikeButton } from '@/components/LikeButton';
import OptionsButton from '@/components/OptionsButton';
import { Album, Song, User } from '@/database/schema';

export interface SongEntry {
  song: Song;
  artist: User;
  album: Album;
}

export default function ArtistPage() {
  const { id: usernameParam } = useParams();
  const username = Array.isArray(usernameParam) ? usernameParam[0] : usernameParam;
  const [artist, setArtist] = useState<User | null>(null);
  const [songs, setSongs] = useState<SongEntry[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the logged-in user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    } else {
      toast.error('User not logged in');
    }

    if (username) {
      fetchArtistData(username);
    }
  }, [username]);

  const fetchArtistData = async (username: string) => {
    try {
      const response = await fetch(`/api/artist/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch artist data');
      }
      const data = await response.json();

      setArtist(data.artist);
      setSongs(data.songs.slice(0, 5)); // Limit the songs to the top 5
      setAlbums(data.albums);
    } catch (error) {
      console.error('Error fetching artist data:', error);
      toast.error('Failed to load artist information.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Loading artist information...
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Artist not found
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header Section */}
      <header className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-8 w-full">
        <div className="flex items-center space-x-6">
          <Image
            src={artist.picture || '/default-profile.png'}
            alt={`${artist.name}'s profile`}
            width={200}
            height={200}
            className="rounded-full shadow-lg"
          />
          <div>
            <h1 className="text-5xl font-bold">{artist.name}</h1>
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
        <div className="grid grid-cols-[50px_3fr_2fr_1fr_50px] text-sm font-semibold uppercase border-b border-gray-700 pb-2">
          <span></span> {/* Empty space for Play Button */}
          <span>Title</span>
          <span>Album</span>
          <span className="text-right">Duration</span>
          <span></span> {/* Empty space for Actions */}
        </div>

        <div className="divide-y divide-gray-700">
          {songs.map(({ song, album, artist: songArtist }, index) => (
            <div
              key={index}
              className="grid grid-cols-[50px_3fr_2fr_1fr_50px] items-center py-4"
            >
              {/* Play Button */}
              <div className="flex items-center justify-center">
                <PlayButton song={song} album={album} author={songArtist} />
              </div>

              {/* Song Title */}
              <div className="font-bold text-gray-300">{song.name}</div>

              {/* Album */}
              <div className="text-gray-400">
                <Link
                  href={`/player/album/${album.id}`}
                  className="text-gray-300 hover:underline"
                >
                  {album.name || 'Unknown Album'}
                </Link>
              </div>

              {/* Duration */}
              <div className="text-right text-gray-400">{song.duration}</div>

              {/* Options */}
              <div className="flex items-center space-x-4 justify-end">
                <LikeButton songId={song.id} userId={loggedInUser?.username || ''} />
                <OptionsButton song={song} artist={songArtist} />
              </div>
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
  );
}
