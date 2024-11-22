import React from 'react'
import Image from 'next/image'

interface ArtistItemProps {
  image: string
  name: string
}

const ArtistItem: React.FC<ArtistItemProps> = ({ image, name }) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Larger Profile Image */}
      <div className="w-32 h-32">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-full"
          width={128} // Larger width
          height={128} // Larger height
        />
      </div>
      <h3 className="text-base font-semibold text-white text-center">{name}</h3>
    </div>
  )
}

export default ArtistItem
