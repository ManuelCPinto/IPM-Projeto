'use client'

import { useMusicPlayerStore } from '@/stores/musicPlayerStore'
import { Song } from '@/database/entities/song'
import { Album } from '@/database/entities/album'
import { User } from '@/database/entities/user'
import { getExtendedSong } from '@/database/utils/getExtendedSong'

export default function PlayButton({
  song,
  album,
  author
}: {
  song: Song
  album: Album
  author: User
}) {
  const set = useMusicPlayerStore((state) => state.set)

  // Handle the play button click to update the song and display the SongCard
  function handlePlayClick() {
    const extendedSong = getExtendedSong(song, album, author)
    set([extendedSong])  // Set the extended song in the music player state
  }

  return (
    <button
      onClick={handlePlayClick}
      className="flex items-center justify-center p-2 bg-transparent active:scale-95 transition transform duration-150 ease-in-out"
      aria-label="Play Song"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z"
        />
      </svg>
    </button>
  )
}
