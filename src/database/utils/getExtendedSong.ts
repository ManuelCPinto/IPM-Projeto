import { Song } from '../entities/song'
import { Album } from '@/database/entities/album'
import { User } from '@/database/entities/user'

export interface ExtendedSong extends Omit<Song, 'author' | 'album'> {
  author: User
  album: Album
}

export function getExtendedSong(song: Song, album: Album, author: User) {
  return {
    ...song,
    album,
    author,
    cover: song.cover || album.cover,
    audio: song.audio || '/songs/FE!N/audio.mp3'
  } as ExtendedSong
}
