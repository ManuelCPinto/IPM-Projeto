'use client'

import ky from 'ky'
import { useMusicPlayerStore } from '@/stores/musicPlayerStore'
import { Song } from '@/database/entities/song'
import { useAsync } from 'react-use'
import { SongCard } from './components/SongCard'
import { Album } from '@/database/entities/album'
import { User } from '@/database/entities/user'
import { getExtendedSong } from '@/database/utils/getExtendedSong'
import { getExtendedAlbum } from '@/database/utils/getExtendedAlbum'
import Center from '@/components/Center'
import { AlbumCard } from '@/app/player/components/AlbumCard'

async function getSongs(albumId?: number, limit = 10) {
  return (await ky
    .get('/api/songs', {
      searchParams: {
        query: '',
        album_id: albumId,
        limit
      }
    })
    .json()) as { song: Song; album: Album; author: User }[]
}

async function getAlbums() {
  return (await ky
    .get('/api/albums', {
      searchParams: {
        query: '',
        limit: 10
      }
    })
    .json()) as { album: Album; artist: User }[]
}

export default function Home() {
  const set = useMusicPlayerStore((state) => state.set)

  const songs = useAsync(getSongs)
  const albums = useAsync(getAlbums)

  async function playAlbumSongs(albumId: number) {
    const songs = await getSongs(albumId, undefined)
    set(songs.map(({ song, album, author }) => getExtendedSong(song, album, author)))
  }

  return (
    <div className="flex flex-col gap-4 p-10 overflow-x-hidden">
      <Center className="p-10">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-900 drop-shadow-md">
          Welcome to MusicBox
        </h1>
        <p className="text-lg text-gray-300 mt-4">Discover your next favorite song or album.</p>
      </Center>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-xl font-bold">Songs</p>
        <div className="flex gap-4 overflow-x-auto overflow-y-hidden">
          {songs.loading ? (
            <p className="opacity-50">Loading...</p>
          ) : (
            songs.value?.map(({ song, album, author }, idx) => {
              const extendedSong = getExtendedSong(song, album, author)
              return (
                <div key={idx} onClick={() => set([extendedSong])}>
                  <SongCard song={extendedSong} />
                </div>
              )
            })
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-xl font-bold">Albums</p>
        <div className="flex gap-4 overflow-x-auto overflow-y-hidden">
          {albums.loading ? (
            <p className="opacity-50">Loading...</p>
          ) : (
            albums.value?.map(({ album, artist }, idx) => {
              const extendedAlbum = getExtendedAlbum(album, artist)
              return (
                <div key={idx} onClick={() => playAlbumSongs(album.id)}>
                  <AlbumCard album={extendedAlbum} />
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
