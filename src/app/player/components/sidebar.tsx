'use client';
import React, { useEffect, useState } from 'react';
import { FaHome, FaCompass, FaMusic, FaHeart, FaStar } from 'react-icons/fa';
import { IoMdMusicalNotes, IoMdPerson } from 'react-icons/io';
import { FiPlusSquare, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface Playlist {
  id: string;
  name: string;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Fetch playlists from user session
  const fetchPlaylists = async () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      toast.error('User not logged in');
      return;
    }

    try {
      const res = await fetch(`/api/user/${user.id}/playlists`);
      if (!res.ok) {
        throw new Error('Failed to fetch playlists');
      }
      const data = await res.json();
      setPlaylists(data.playlists || []);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      toast.error('Error fetching playlists');
    }
  };

  // Add a new playlist
  const addPlaylist = async () => {
    const playlistName = prompt('Enter playlist name:');
    if (!playlistName) return;

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      toast.error('User not logged in');
      return;
    }

    try {
      const res = await fetch(`/api/user/${user.id}/playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playlistName }),
      });
      if (!res.ok) {
        throw new Error('Failed to create playlist');
      }
      const newPlaylist = await res.json();
      setPlaylists((prev) => [...prev, newPlaylist]);
      toast.success('Playlist created!');
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast.error('Error creating playlist');
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div
      className={`bg-[radial-gradient(ellipse_80%_80%_at_50%_80%,rgba(8,12,25,1),rgba(20,20,45,0.9))] border-r border-gray-700 h-full ${
        isOpen ? 'w-48' : 'w-14'
      } flex flex-col transition-width duration-300 relative overflow-hidden`}
    >
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
          <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            <FaCompass size={isOpen ? 16 : 24} />
            {isOpen && <span>Explore</span>}
          </div>
          <Link
            href="/player/ratings"
            className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition"
          >
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
          <div
            className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition"
            onClick={addPlaylist}
          >
            <FiPlusSquare size={isOpen ? 16 : 24} />
            {isOpen && <span>Create new playlist</span>}
          </div>
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlist/${playlist.id}`}
              className="py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition"
            >
              {isOpen ? (
                <span className="pl-8">{playlist.name}</span>
              ) : (
                <div className="flex items-center w-4 h-4 bg-gray-400 rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
