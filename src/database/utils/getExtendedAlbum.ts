import { Album } from '@/database/entities/album'
import { User } from '@/database/entities/user'

export interface ExtendedAlbum extends Omit<Album, 'artist'> {
  artist: User
}

export function getExtendedAlbum(album: Album, artist: User) {
  return {
    ...album,
    artist
  } as ExtendedAlbum
}
