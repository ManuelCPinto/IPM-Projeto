'use client'

import ky from 'ky'
import { useMusicPlayerStore } from '@/stores/musicPlayerStore'
import { Song } from '@/database/entities/song'
import { useAsync } from 'react-use'
import { SongCard } from '@/app/player/components/SongCard'

export default function Home() {
  const set = useMusicPlayerStore((state) => state.set)

  const songs = useAsync(getSongs)

  async function getSongs() {
    return (await ky
      .get('/api/songs', {
        searchParams: {
          query: ''
        }
      })
      .json()) as Song[]
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-4xl font-bold">Home</p>
      <div className="flex flex-col gap-3">
        <p className="text-xl font-bold">Recommendation</p>
        <div className="flex flex-wrap gap-4">
          {songs.loading ? (
            <p className="opacity-50">Loading...</p>
          ) : (
            songs.value?.map((song, idx) => (
              <div key={idx} onClick={() => set([song])}>
                <SongCard song={song} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
