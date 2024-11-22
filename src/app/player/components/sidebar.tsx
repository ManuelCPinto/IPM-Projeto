'use client'

import React, { useState } from 'react'
import { FaHome, FaRegHeart, FaMusic, FaHeart, FaStar } from 'react-icons/fa'
import { IoMdMusicalNotes, IoMdPerson } from 'react-icons/io'
import { FiPlusSquare, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Link from 'next/link'

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`bg-[radial-gradient(ellipse_80%_80%_at_50%_80%,rgba(8,12,25,1),rgba(20,20,45,0.9))] border-r border-gray-700 h-full ${isOpen ? 'w-48' : 'w-14'} flex flex-col transition-width duration-300 relative overflow-hidden`}>
      {/* Header Section */}
      <div className="flex items-center justify-between p-4">
        {isOpen && <span className="text-lg font-semibold">Timothy</span>}
        <button
          className="bg-gray-700 rounded-full p-1 text-white hover:bg-gray-600 transition-colors"
          onClick={toggleSidebar}
        >
          {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-grow overflow-y-auto px-4 max-h-[calc(100vh-175px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {/* Main Links */}
        <div className={`space-y-2 ${!isOpen ? 'text-center' : ''}`}>
          <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            <FaHome size={isOpen ? 16 : 24} />
            {isOpen && <span>Home</span>}
          </div>
          <Link href="/player/liked-songs" className="flex items-center gap-3 py-2 cursor-pointe hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            <FaRegHeart size={isOpen ? 16 : 24} />
            {isOpen && <span>Liked Songs</span>}
          </Link>
          <Link href="/player/ratings" className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            <FaStar size={isOpen ? 16 : 24} />
            {isOpen && <span>Ratings</span>}
          </Link>
        </div>

        {/* Collection Section */}
        {isOpen && <p className="mt-6 text-xs font-bold text-gray-400 uppercase">My Collection</p>}
        <div className={`space-y-2 mt-2 ${!isOpen ? 'text-center' : ''}`}>
          <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            <IoMdMusicalNotes size={isOpen ? 16 : 24} />
            {isOpen && <span>My Mix</span>}
          </div>
          <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            <FaMusic size={isOpen ? 16 : 24} />
            {isOpen && <span>Playlists</span>}
          </div>
          <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            <FaHeart size={isOpen ? 16 : 24} />
            {isOpen && <span>Albums</span>}
          </div>
          <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            <IoMdPerson size={isOpen ? 16 : 24} />
            {isOpen && <span>Artists</span>}
          </div>
        </div>

        {/* Playlists Section */}
        {isOpen && <p className="mt-6 text-xs font-bold text-gray-400 uppercase">My Playlists</p>}
        <div className={`space-y-2 mt-2 ${!isOpen ? 'text-center' : ''}`}>
          <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            <FiPlusSquare size={isOpen ? 16 : 24} />
            {isOpen && <span>Create new playlist</span>}
          </div>
          <div className="py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            {isOpen ? (
              <span className="pl-8">Playlist 1</span>
            ) : (
              <div className="flex items-center w-4 h-4 bg-gray-400 rounded-full"></div>
            )}
          </div>
          <div className="py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            {isOpen ? (
              <span className="pl-8">Playlist 2</span>
            ) : (
              <div className="flex items-center w-4 h-4 bg-gray-400 rounded-full"></div>
            )}
          </div>
          <div className="py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            {isOpen ? (
              <span className="pl-8">Playlist 2</span>
            ) : (
              <div className="items-center w-4 h-4 bg-gray-400 rounded-full"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
