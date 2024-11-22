// src/app/components/MusicItem.tsx

import React from 'react'
import Image from 'next/image'

interface MusicItemProps {
  image: string
  title: string
  subtitle: string
}

const MusicItem: React.FC<MusicItemProps> = ({ image, title, subtitle }) => {
  return (
    <div className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700">
      <Image
        src={image}
        alt={title}
        className="w-16 h-16 object-cover rounded-md"
        width={80} height={80}
      />
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  )
}

export default MusicItem
