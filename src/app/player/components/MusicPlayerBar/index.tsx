'use client'

import MusicCard from '@/app/player/components/MusicPlayerBar/MusicCard'
import { useMusicPlayerStore } from '@/stores/musicPlayerStore'
import AudioControl from '@/app/player/components/MusicPlayerBar/AudioControl'
import VolumeControl from '@/app/player/components/MusicPlayerBar/VolumeControl'

export default function MusicPlayerBar() {
  const currentMusic = useMusicPlayerStore((state) => state.currentMusic())

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3 gap-5 bg-blue-900">
      <div>{currentMusic && <MusicCard music={currentMusic} />}</div>
      <div className="flex-grow">
        <AudioControl />
      </div>
      <div className="justify-self-end w-52">
        <VolumeControl />
      </div>
    </div>
  )
}
