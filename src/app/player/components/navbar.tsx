'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaUser } from 'react-icons/fa';
import SearchBar from '@/app/player/search/SearchBar'; // Import SearchBar from the correct path
import { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, []);

  return (
    <nav className="bg-neutral-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(15,20,50,1),rgba(5,10,40,0.9))] text-white shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link href="/player">
          <div className="flex items-center cursor-pointer">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <SearchBar />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/player" className="hover:text-gray-300">
            <FaHome size={20} />
          </Link>
          {username ? (
            <Link href={`/profile/${username}`} className="hover:text-gray-300">
              <FaUser size={20} />
            </Link>
          ) : (
            <Link href="/login" className="hover:text-gray-300">
              <FaUser size={20} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
