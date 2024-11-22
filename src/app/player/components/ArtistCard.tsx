import { ScalableImage } from '@/components/ScalableImage'
import { User } from '@/database/entities/user'

export function ArtistCard({ artist }: { artist: User }) {
  return (
    <div className="flex flex-col gap-2 w-44 p-3 items-center bg-blue-400/5 rounded-md hover:scale-105 shadow-md transition cursor-pointer">
      <ScalableImage src="/" alt="Album cover" className="rounded-full aspect-square bg-black/30" />
      <p className="font-bold text-[15px]">{artist.name}</p>
    </div>
  )
}
