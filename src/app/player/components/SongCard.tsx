import { Song } from '@/database/entities/song'

export function SongCard({ song }: { song: Song }) {
  return (
    <div className="flex flex-col gap-2 w-52 p-3 bg-blue-400/5 rounded-md hover:scale-105 shadow-md transition cursor-pointer">
      <img src={'/covers/utopia.webp'} alt="Song cover" className="rounded-md" />
      <div>
        <p className="font-bold">{song.name}</p>
        <p className="opacity-50">{song.feature}</p>
      </div>
    </div>
  )
}
