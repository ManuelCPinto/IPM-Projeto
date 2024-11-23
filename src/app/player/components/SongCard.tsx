import { ExtendedSong } from '@/database/utils/getExtendedSong'
import { ScalableImage } from '@/components/ScalableImage'

export function SongCard({ song }: { song: ExtendedSong }) {
  return (
    <div className="flex flex-col gap-2 w-44 p-3 bg-blue-400/5 rounded-md hover:scale-105 shadow-md transition cursor-pointer">
      <ScalableImage src={song.cover} alt="Song cover" className="rounded-md aspect-square bg-black/30" />
      <div>
        <p className="font-bold text-[15px]">{song.name}</p>
        <p className="opacity-50 text-xs">{song.author.name + (song.feature ? ', ' + song.feature : '')}</p>
      </div>
    </div>
  )
}
