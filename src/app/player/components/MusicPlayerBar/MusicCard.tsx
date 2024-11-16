'use client'

import Image from 'next/image'
import { Music } from '@/stores/musicPlayerStore'

export default function MusicCard({ music }: { music: Music }) {
  return (
    <div className="flex">
      <Image src={music.imageURL} alt="Music Image" />
      <div className="flex flex-col">
        <p>{music.name}</p>
        <p>{music.author}</p>
      </div>
    </div>
  )
}
