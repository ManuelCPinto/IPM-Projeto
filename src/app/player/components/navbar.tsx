// src/app/components/Navbar.tsx

'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { FaHome, FaUser } from 'react-icons/fa'
import Image from 'next/image'

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-neutral-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(15,20,50,1),rgba(5,10,40,0.9))] text-white shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="relative flex items-center w-full max-w-md mx-auto">
          <svg
            className="absolute left-3 text-gray-300"
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
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-900 text-white placeholder-gray-300 focus:outline-none transition-colors"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className={`${isActive('/') ? 'text-gray-300' : 'text-white'} hover:text-gray-300`}>
            <FaHome size={24} />
          </Link>
          <Link
            href="/profile"
            className={`${isActive('/profile') ? 'text-gray-300' : 'text-white'} hover:text-gray-300`}
          >
            <FaUser size={24} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
