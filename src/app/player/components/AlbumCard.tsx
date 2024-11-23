import { ScalableImage } from '@/components/ScalableImage'
import { ExtendedAlbum } from '@/database/utils/getExtendedAlbum'

export function AlbumCard({ album }: { album: ExtendedAlbum }) {
  return (
    <div className="flex flex-col gap-2 w-44 p-3 bg-blue-400/5 rounded-md hover:scale-105 shadow-md transition cursor-pointer">
      <ScalableImage src={album.cover} alt="Album cover" className="rounded-md aspect-square bg-black/30" />
      <div>
        <p className="font-bold text-[15px]">{album.name}</p>
        <p className="opacity-50 text-xs">{album.artist.name}</p>
      </div>
    </div>
  )
}
