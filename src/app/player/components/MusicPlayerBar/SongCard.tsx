'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ExtendedSong } from '@/database/utils/getExtendedSong';
import { LikeButton } from '@/components/LikeButton';
import OptionsButton from '@/components/OptionsButton';
import { Song } from '@/database/schema';
import toast from 'react-hot-toast';

export default function SongCard({ song }: { song: ExtendedSong }) {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentSong, setSong] = useState<Song | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user.username); // Assume username is the identifier
    }
    fetchSongData()
  }, []);

  const fetchSongData = async () => {
    try {
      const response = await fetch(`/api/song/${song.id}`);
      if (!response.ok) throw new Error("Failed to fetch song data");
      const data = await response.json(); // Correctly typed as SongEntry

      setSong(data.song);
    } catch (error) {
      console.error("Error fetching song:", error);
      toast.error("Failed to load song details");
    } 
  };

  return (
    <div className="flex gap-3 items-center">
      {/* Song Cover */}
      <Image
        src={song.cover}
        height={80}
        width={80}
        alt="Music Image"
        className="rounded"
      />

      {/* Song Details */}
      <div className="flex flex-col justify-center max-w-64 overflow-hidden flex-grow">
        {/* Song Name */}
        <p className="text-xl truncate">{song.name}</p>
        
        {/* Author Name as Link */}
        <Link href={`/player/artist/${song.author.username}`}>
          <p className="text-xs opacity-70 truncate hover:underline">
            {song.author.name}
          </p>
        </Link>

        {/* Album Name as Link */}
        <Link href={`/player/album/${song.album.id}`}>
          <p className="text-xs opacity-70 truncate hover:underline">
            {song.album.name}
          </p>
        </Link>
      </div>

      {/* Like Button */}
      {currentUser && (
        <LikeButton 
          songId={song.id} 
          userId={currentUser} 
        />
      )}

      {/* Options Button */}
      <OptionsButton 
        song={currentSong} 
        artist={song.author} 
      />
    </div>
  );
}
