import React, { useEffect, useState } from 'react';
import { FaHome, FaCompass, FaMusic, FaHeart, FaStar, FaRegHeart } from 'react-icons/fa';
import { IoMdMusicalNotes, IoMdPerson } from 'react-icons/io';
import { FiPlusSquare, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Playlist, User } from '@/database/schema';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [selectedCover, setSelectedCover] = useState<string | null>(null);

  const predefinedCovers = [
    '/covers/Album 1.png',
    '/covers/Album 2.png',
    '/covers/Album 3.png',
    '/covers/Album 4.png',
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setPlaylistName('');
    setSelectedCover(null);
  };

  const handleAddPlaylist = async () => {
    if (!playlistName.trim()) {
      toast.error('Playlist name cannot be empty');
      return;
    }

    if (!user) {
      toast.error('User not logged in');
      return;
    }

    if (!selectedCover) {
      toast.error('Please select a cover image');
      return;
    }

    try {
      const res = await fetch(`/api/user/${user.username}/playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
          coverImage: selectedCover,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create playlist');
      }

      const { playlist } = await res.json();

      setPlaylists((prev) => [...prev, playlist]);
      toast.success('Playlist created successfully');
      toggleModal(); // Close modal
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast.error(error.message || 'Error creating playlist');
    }
  };

  // Fetch playlists for the user
  const fetchPlaylists = async () => {
    if (!user) {
      toast.error('User not logged in');
      return;
    }

    try {
      const res = await fetch(`/api/user/${user.username}/playlists`);
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

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      toast.error('User not logged in');
    }
  }, []);

  // Fetch playlists whenever the user is set
  useEffect(() => {
    if (user) {
      fetchPlaylists();
    }
  }, [user]);

  return (
    <div
      className={`bg-[radial-gradient(ellipse_80%_80%_at_50%_80%,rgba(8,12,25,1),rgba(20,20,45,0.9))] border-r border-gray-700 h-full ${
        isOpen ? 'w-48' : 'w-14'
      } flex flex-col transition-width duration-300 relative overflow-hidden`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-4">
        {isOpen && <span className="text-lg font-semibold">{user?.username || 'Guest'}</span>}
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
          <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition">
            <FaCompass size={isOpen ? 16 : 24} />
            {isOpen && <span>Explore</span>}</div>
            </Link>
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
        <div className={`space-y-4 mt-2 ${!isOpen ? 'text-center' : ''}`}> {/* Increased gap between playlist cards */}
          <div
            className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600 hover:bg-gray-800 rounded-xl transition"
            onClick={toggleModal}
          >
            <FiPlusSquare size={isOpen ? 16 : 24} />
            {isOpen && <span>Create new playlist</span>}
          </div>
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className={`relative group cursor-pointer transition-transform ${
                isOpen ? 'w-20 h-20' : 'w-12 h-12'
              }`}
            >
              <Link href={`/player/playlist/${playlist.id}`}>
                {/* Display playlist cover */}
                <Image
                  src={playlist.cover || '/covers/default.png'}
                  alt={`${playlist.name} Cover`}
                  width={isOpen ? 80 : 24}
                  height={isOpen ? 80 : 24}
                  className="rounded-md object-cover"
                />
                
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {isOpen && <span className="text-sm font-medium px-3">{playlist.name}</span>} {/* Added padding to playlist name */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-80">
            <h2 className="text-lg font-semibold text-white mb-4">Create Playlist</h2>
            <input
              type="text"
              placeholder="Enter playlist name"
              className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              {predefinedCovers.map((cover) => (
                <div
                  key={cover}
                  className={`p-2 border-2 rounded-md cursor-pointer ${
                    selectedCover === cover ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedCover(cover)}
                >
                  <Image
                    src={cover}
                    alt="Cover Option"
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                onClick={handleAddPlaylist}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;