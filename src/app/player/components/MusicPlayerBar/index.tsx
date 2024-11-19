'use client'

import MusicCard from '@/app/player/components/MusicPlayerBar/MusicCard'
import { useMusicPlayerStore } from '@/stores/musicPlayerStore'
import AudioControl from '@/app/player/components/MusicPlayerBar/AudioControl'
import VolumeControl from '@/app/player/components/MusicPlayerBar/VolumeControl'
import Image from 'next/image'
import { useState } from 'react'
import { clsx } from 'clsx'
import { Tooltip } from '@mui/material'

export default function MusicPlayerBar() {
  const currentMusic = useMusicPlayerStore((state) => state.currentMusic())

  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3 gap-5 bg-neutral-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_80%,rgba(10,15,30,1),rgba(25,25,55,0.8))] shadow-t-md border-t border-gray-700 relative z-[1]">
        <div>{currentMusic && <MusicCard music={currentMusic} />}</div>
        <div className="flex-grow">
          <AudioControl onPlay={setIsPlaying} />
        </div>
        <div className="justify-self-end w-52">
          <VolumeControl />
        </div>
      </div>
      <div
        className={clsx(
          'absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:-translate-y-2/3 cursor-pointer transition',
          currentMusic ? 'opacity-70 hover:opacity-100' : '-translate-y-1/3 opacity-50 pointer-events-none'
        )}
      >
        <Tooltip title="Rate Music">
          <Image
            src="/logo.png"
            alt="Logo"
            height={200}
            width={200}
            className={clsx(isPlaying && 'animate-spin [animation-duration:_4s]', 'hover:filter hover:hue-rotate-180')}
          ></Image>
        </Tooltip>
      </div>
    </div>
  )
}
