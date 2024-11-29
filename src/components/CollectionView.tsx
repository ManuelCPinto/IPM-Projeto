'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Song, User, Album } from '@/database/schema';
import PlayButton from '@/components/PlayButton';
import { LikeButton } from '@/components/LikeButton';
import OptionsButton from '@/components/OptionsButton';

interface SongEntry {
  song: Song;
  artist: User;
  album: Album;
}

interface CollectionViewProps {
  name: string; // Playlist/Album name
  author: string; // Author name
  authorUsername?: string; // Author username for linking
  imageURL: string; // Cover image
  songs: SongEntry[]; // List of songs
  currentPlaylistId?: number; // Optional: Current playlist ID
  isAlbum?: boolean; // Flag to determine if this is an album
}

export const CollectionView: React.FC<CollectionViewProps> = ({
  name,
  author,
  authorUsername,
  imageURL,
  songs,
  currentPlaylistId,
  isAlbum = false, // Default to false
}) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.username); // Assuming `username` identifies the user
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header Section */}
      <header className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-8 w-full">
        <div className="flex items-center space-x-6">
          {/* Collection Cover */}
          <Image
            src={imageURL || '/default-cover.png'}
            alt={`${name} cover`}
            width={200}
            height={200}
            className="rounded-lg shadow-lg"
          />
          <div>
            {/* Collection Name */}
            <h1 className="text-5xl font-bold">{name}</h1>
            {/* Author */}
            {isAlbum ? (
              <p className="text-sm text-gray-400 mt-2">
                By{' '}
                <Link
                  href={`/player/artist/${authorUsername}`}
                  className="text-blue-500 hover:underline"
                >
                  {author}
                </Link>
              </p>
            ) : (
              <p className="text-sm text-gray-400 mt-2">Created by: {author}</p>
            )}
            {/* Song Count */}
            <p className="text-sm text-gray-400 mt-1">
              <span className="text-white font-bold">{songs.length}</span>{' '}
              {songs.length === 1 ? 'song' : 'songs'}
            </p>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700"></div>
      </header>

      {/* Songs Section */}
      <section className="p-10 bg-gradient-to-b from-gray-900 to-gray-800">
        <h2 className="text-2xl font-bold mb-4">Songs</h2>
        <div className="grid grid-cols-[50px_3fr_2fr_2fr_1fr_50px] text-sm font-semibold uppercase border-b border-gray-700 pb-2">
          <span></span> {/* Empty space for Play Button */}
          <span>Title</span>
          <span>Artist</span>
          <span>Album</span>
          <span className="text-right">Duration</span>
          <span></span> {/* Empty space for Actions */}
        </div>

        <div className="divide-y divide-gray-700">
          {songs.length > 0 ? (
            songs.map((entry, index) => (
              <div
                key={index}
                className="grid grid-cols-[50px_3fr_2fr_2fr_1fr_50px] items-center py-4"
              >
                {/* Play Button */}
                <div className="flex items-center justify-center">
                  <PlayButton
                    song={entry.song}
                    album={entry.album}
                    author={entry.artist}
                  />
                </div>

                {/* Song Title */}
                <div className="font-bold text-gray-300">{entry.song.name}</div>

                {/* Artist */}
                <div className="text-gray-400">
                  <Link
                    href={`/player/artist/${entry.artist.username}`}
                    className="text-gray-300 hover:underline"
                  >
                    {entry.artist.name}
                  </Link>
                </div>

                {/* Album */}
                <div className="text-gray-400">
                  <Link
                    href={`/player/album/${entry.album.id}`}
                    className="text-gray-300 hover:underline"
                  >
                    {entry.album.name}
                  </Link>
                </div>

                {/* Duration */}
                <div className="text-right text-gray-400">{entry.song.duration}</div>

                {/* Options */}
                <div className="flex items-center space-x-4 justify-end">
                  <LikeButton songId={entry.song.id} userId={user} />
                  <OptionsButton
                    song={entry.song}
                    artist={entry.artist}
                    currentPlaylistId={currentPlaylistId}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 mt-4">No songs available in this collection.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CollectionView;
