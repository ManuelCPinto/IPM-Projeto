'use client'

import Image from 'next/image'
import { ExtendedSong } from '@/database/utils/getExtendedSong'

export default function SongCard({ song }: { song: ExtendedSong }) {
  return (
    <div className="flex gap-3">
      <Image src={song.cover} height={80} width={80} alt="Music Image" className="rounded" />
      <div className="flex flex-col justify-center max-w-64 overflow-hidden">
        <p className="text-xl text truncate">{song.name}</p>
        <p className="text-xs opacity-70 truncate">{song.author.name}</p>
      </div>
    </div>
  )
}
