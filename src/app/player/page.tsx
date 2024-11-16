'use client'

import ky from 'ky'
import { useMusicPlayerStore } from '@/stores/musicPlayerStore'
import { Music } from '@/database/schema'

export default function PLayer() {
  const set = useMusicPlayerStore((state) => state.set)

  async function addMusicToMusicPlayer() {
    const musics = (await ky
      .get('/api/music', {
        searchParams: {
          name: 'FE!N'
        }
      })
      .json()) as Music[]

    set([musics[0]])
  }

  return <button onClick={addMusicToMusicPlayer}>Add Music to Music Player</button>
}
