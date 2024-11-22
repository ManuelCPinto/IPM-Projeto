import { ExtendedSong } from '@/database/utils/getExtendedSong'
import Image from 'next/image'

export function SongCard({ song }: { song: ExtendedSong }) {
  return (
    <div className="flex flex-col gap-2 w-52 p-3 bg-blue-400/5 rounded-md hover:scale-105 shadow-md transition cursor-pointer">
      <Image src={song.cover} alt="Song cover" layout="fill" className="rounded-md" />
      <div>
        <p className="font-bold">{song.name}</p>
        <p className="opacity-50 text-xs">{song.author.name + (song.feature ? ' feat. ' + song.feature : '')}</p>
      </div>
    </div>
  )
}
