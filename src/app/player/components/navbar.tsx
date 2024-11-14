// src/app/components/Navbar.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'
import { FaHome, FaUser } from 'react-icons/fa' // Importing icons
import '../../styles/components/navbar.css' // Importing navbar styles


const Navbar: React.FC = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/">
          <div className="logo">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>
        </Link>
        {/* Search Bar */}
        <div className="search-bar">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width={20}
            height={20}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z"
            />
          </svg>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>

        {/* Navigation Links */}
        <div className="nav-icons">
          {/* Home Link with Icon */}
          <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} aria-label="Home">
            <FaHome size={25} />
          </Link>
          {/* Profile Link with Icon */}
          <Link href="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`} aria-label="Profile">
            <FaUser size={25} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
