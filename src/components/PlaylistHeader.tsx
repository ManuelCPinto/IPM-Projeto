import React from 'react'
import { FaShuffle } from 'react-icons/fa6'
import Image from 'next/image'

interface PlaylistHeaderProps {
  name: string
  author: string
  imageURL: string
}

export const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ name, author, imageURL }) => {
  if (!name || !author || !imageURL) {
    return <div>Missing album details</div>
  }

  return (
    <div className="album-header">
      <div className="album-info">
        <Image
          src={imageURL}
          alt="Playlist Logo"
          className="playlist-logo"
          width={150} // Example width
          height={150} // Example height
          priority // Optional: Use this for important images (e.g., above the fold)
          objectFit="cover" // Optional: Style how the image fits its container
        />{' '}
        <div className="band-info">
          <h1 className="album-name">{name}</h1>
          <h2 className="band-name">
            <strong>{author}</strong>
          </h2>
        </div>
      </div>
      <div className="playlist-options">
        <button className="playlist-play-button">
          <div className="playlist-play-triangle-icon"></div>
        </button>
        <button className="shuffle-button">
          <FaShuffle />
        </button>
        <button className="playlist-like-button">♥</button>
        <button className="playlist-options-button">Review</button>
      </div>
    </div>
  )
}
