'use client';

import ky from 'ky';
import { useMusicPlayerStore } from '@/stores/musicPlayerStore';
import { Song } from '@/database/entities/song';
import { useAsync } from 'react-use';
import { SongCard } from '@/app/player/components/SongCard';
import { Album } from '@/database/entities/album';
import { User } from '@/database/entities/user';
import { getExtendedSong } from '@/database/utils/getExtendedSong';
import { useState } from 'react';

export default function Home() {
  const set = useMusicPlayerStore((state) => state.set);
  const [query, setQuery] = useState('');

  const songs = useAsync(() => getSongs(query), [query]);

  async function getSongs(query: string) {
    const response = await ky
      .get('/api/songs', {
        searchParams: {
          query,
        },
      })
      .json();


    if (!Array.isArray(response)) {
      console.error('Expected an array, but got:', response);
      return [];
    }

    return response as { song: Song; album: Album; author: User }[];
  }

  const recommendedArtists = [
    { name: 'Artist 1', image: '/artist1.jpg' },
    { name: 'Artist 2', image: '/artist2.jpg' },
    { name: 'Artist 3', image: '/artist3.jpg' },
  ];

  const recentlyListenedTo = [
    { name: 'Song A', album: 'Album A', artist: 'Artist A', cover: '/songA.jpg' },
    { name: 'Song B', album: 'Album B', artist: 'Artist B', cover: '/songB.jpg' },
    { name: 'Song C', album: 'Album C', artist: 'Artist C', cover: '/songC.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header Section */}
      <header className="py-8 px-8 bg-blue-900 shadow-md">
        <h1 className="text-4xl font-bold tracking-tight text-white">MusicBox</h1>
        <p className="text-lg mt-2 text-gray-300">Discover your next favorite song or album.</p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search for songs, albums, or artists..."
          className="w-2/3 md:w-1/2 lg:w-1/3 px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Recommendations Section */}
      <section className="px-8 py-10">
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-gray-700 pb-2">Recommended Songs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {songs.loading ? (
            <p className="text-gray-400 text-lg">Loading recommendations...</p>
          ) : songs.value?.length ? (
            songs.value.map(({ song, album, author }, idx) => {
              const extendedSong = getExtendedSong(song, album, author);
              return (
                <div
                  key={idx}
                  className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 cursor-pointer"
                  onClick={() => set([extendedSong])}
                >
                  <SongCard song={extendedSong} />
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 text-lg">No songs found. Try another search.</p>
          )}
        </div>
      </section>

      {/* Recommended Artists Section */}
      <section className="px-8 py-10 bg-gray-900">
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-gray-700 pb-2">Recommended Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {recommendedArtists.map((artist, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 text-center"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="rounded-full w-20 h-20 mx-auto mb-3"
              />
              <p className="text-lg font-medium">{artist.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Listened To Section */}
      <section className="px-8 py-10">
        <h2 className="text-3xl font-semibold mb-6 border-b-2 border-gray-700 pb-2">Recently Listened To</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentlyListenedTo.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <img
                src={item.cover}
                alt={`${item.name} Cover`}
                className="rounded-lg w-full h-40 object-cover mb-3"
              />
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-400">{item.album}</p>
              <p className="text-gray-400">by {item.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 bg-gray-900 text-center">
        <p className="text-gray-500">
          Made with <span className="text-red-500">♥</span> by the MusicBox Team
        </p>
      </footer>
    </div>
  );
}
