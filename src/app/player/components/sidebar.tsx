// src/app/components/Sidebar.tsx

'use client'
import React, { useState } from 'react'
import { FaHome, FaCompass, FaVideo, FaMusic, FaHeart, FaShoppingBag } from 'react-icons/fa'
import { IoMdMusicalNotes, IoMdDownload, IoMdPerson } from 'react-icons/io'
import { FiPlusSquare, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import '../../styles/components/sidebar.css'

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>

      {/* User Info */}
      <div className="sidebar-header">
      {/* Depois adicionar foto */}
      {isOpen && <span className="username">Timothy</span>}
        {isOpen && <button className="more-options">•••</button>}
      </div>

      {/* Main Links */}
      <div className="sidebar-section">
        <div className="sidebar-item">
          <FaHome className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Home</span>}
        </div>
        <div className="sidebar-item">
          <FaCompass className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Explore</span>}
        </div>
        <div className="sidebar-item">
          <FaVideo className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Videos</span>}
        </div>
      </div>

      {/* Collection Section */}
      <div className="sidebar-section">
        {isOpen && <p className="sidebar-section-title">MY COLLECTION</p>}
        <div className="sidebar-item">
          <IoMdMusicalNotes className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">My Mix</span>}
        </div>
        <div className="sidebar-item">
          <FaMusic className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Playlists</span>}
        </div>
        <div className="sidebar-item">
          <FaHeart className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Albums</span>}
        </div>
        <div className="sidebar-item">
          <IoMdMusicalNotes className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Tracks</span>}
        </div>
        <div className="sidebar-item">
          <FaVideo className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Videos</span>}
        </div>
        <div className="sidebar-item">
          <IoMdPerson className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Artists</span>}
        </div>
        <div className="sidebar-item">
          <IoMdDownload className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Downloads</span>}
        </div>
        <div className="sidebar-item">
          <FaShoppingBag className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Purchases</span>}
        </div>
      </div>

      {/* Playlists Section */}
      <div className="sidebar-section">
        {isOpen && <p className="sidebar-section-title">MY PLAYLISTS</p>}
        <div className="sidebar-item">
          <FiPlusSquare className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Create new playlist</span>}
        </div>
        <div className="sidebar-item">
          {isOpen ? <span className="playlist-label">Relax & Calm</span> : <div className="sidebar-icon" />}
        </div>
        <div className="sidebar-item">
          {isOpen ? <span className="playlist-label">Hip-Hop</span> : <div className="sidebar-icon" />}
        </div>
        <div className="sidebar-item">
          {isOpen ? <span className="playlist-label">Real Love</span> : <div className="sidebar-icon" />}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
