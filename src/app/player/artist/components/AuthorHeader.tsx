import React from 'react'
import Image from 'next/image'

interface AuthortHeaderProps {
  author: string
  imageURL: string
}

export const AuthorHeader: React.FC<AuthortHeaderProps> = ({ author, imageURL }) => {
  if (!author || !imageURL) {
    return <div>Missing artist details</div>
  }

  return (
    <div className="artist-header">
      <div className="artist-info">
        <Image
          src={imageURL}
          alt="Playlist Logo"
          className="artist-logo"
          width={400} // Example width
          height={400} // Example height
          priority // Optional: Use this for important images (e.g., above the fold)
          objectFit="cover" // Optional: Style how the image fits its container
        />{' '}
        <div className="artist-info">
          <h2 className="artist-name">
            <strong>{author}</strong>
          </h2>
        </div>
      </div>
    </div>
  )
}
