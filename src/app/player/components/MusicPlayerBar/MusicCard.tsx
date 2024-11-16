'use client'

import Image from 'next/image'
import { Music } from '@/database/schema'

export default function MusicCard({ music }: { music: Music }) {
  return (
    <div className="flex gap-3">
      <Image src={music.imageURL} height={80} width={80} alt="Music Image" className="rounded" />
      <div className="flex flex-col justify-center max-w-64 overflow-hidden">
        <p className="text-xl text truncate">{music.name}</p>
        <p className="text-xs opacity-70 truncate">{music.author}</p>
      </div>
    </div>
  )
}
