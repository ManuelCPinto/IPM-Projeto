import React from 'react'
import Image from 'next/image'

interface ArtistProps {
  id: number
  image: string
  name: string
}

interface ArtistListingProps {
  artists: ArtistProps[]
  onArtistClick?: (id: number) => void
}

const ArtistListing: React.FC<ArtistListingProps> = ({ artists, onArtistClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {artists.map((artist) => (
        <div
          key={artist.id}
          className="flex flex-col items-center space-y-2 cursor-pointer"
          onClick={() => onArtistClick && onArtistClick(artist.id)} // Trigger click event
        >
          <Image
            src={artist.image}
            alt={artist.name}
            className="w-20 h-20 rounded-full object-cover"
            width={128} height={128}
          />
          <h3 className="text-sm font-semibold text-white text-center">{artist.name}</h3>
        </div>
      ))}
    </div>
  )
}

export default ArtistListing
