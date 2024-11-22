'use client';

import ky from 'ky';
import { useMusicPlayerStore } from '@/stores/musicPlayerStore';
import { useAsync } from 'react-use';
import { SongCard } from '@/app/player/components/SongCard';
import { UserCard } from '@/app/player/components/UserCard';
import { useState } from 'react';

export default function Home() {
  const set = useMusicPlayerStore((state) => state.set);
  const [query, setQuery] = useState('tr');

  const songs = useAsync(() => getSongs(query), [query]);
  const artists = useAsync(getArtists);
  const recentlyListened = useAsync(getRecentlyListened);

  async function getSongs(query: string) {
    const response = await ky
      .get('/api/songs', {
        searchParams: { query },
      })
      .json();
    return response as { name: string; album: string; cover: string }[];
  }

  async function getArtists() {
    const response = await ky.get('/api/users/artists').json();
    return response as { name: string; username: string; image?: string }[];
  }

  async function getRecentlyListened() {
    const response = await ky.get('/api/songs/recently-listened').json();
    return response as { name: string; album: string; cover: string }[];
  }

  return (
    <div className="min-h-screen text-white relative overflow-auto">
      {/* Centered Welcome Text */}
      <header className="flex flex-col justify-center items-center py-12">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-900 drop-shadow-md">
          Welcome to MusicBox
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          Discover your next favorite song or album.
        </p>
      </header>

      {/* Content */}
      <div className="relative z-10 px-8 py-10 space-y-16">
        {/* Recommendations Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">Recommended Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {songs.loading ? (
              <p className="text-gray-400 text-lg">Loading recommendations...</p>
            ) : songs.value?.length ? (
              songs.value.map((song, idx) => (
                <SongCard
                  key={idx}
                  song={song}
                  onClick={() => set([song])} // Add to the music player store
                />
              ))
            ) : (
              <p className="text-gray-400 text-lg">No songs found. Try another search.</p>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-1 bg-blue-900 rounded-lg my-8"></div>

        {/* Recommended Artists Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">Recommended Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {artists.loading ? (
              <p className="text-gray-400 text-lg">Loading artists...</p>
            ) : artists.value?.length ? (
              artists.value.map((artist, idx) => (
                <UserCard
                  key={idx}
                  user={artist}
                  onClick={() => console.log(`Clicked on artist: ${artist.name}`)}
                />
              ))
            ) : (
              <p className="text-gray-400 text-lg">No artists found.</p>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-1 bg-blue-900 rounded-lg my-8"></div>

        {/* Recently Listened To Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">Recently Listened To</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyListened.loading ? (
              <p className="text-gray-400 text-lg">Loading recently listened...</p>
            ) : recentlyListened.value?.length ? (
              recentlyListened.value.map((song, idx) => (
                <SongCard
                  key={idx}
                  song={song}
                  onClick={() => set([song])} // Add to the music player store
                />
              ))
            ) : (
              <p className="text-gray-400 text-lg">No recently listened songs found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
