import React, { useState, useRef, useEffect } from 'react';
import { Playlist, Song, User } from '@/database/schema';
import { toast } from 'react-hot-toast';
import { FaPlus, FaTrash, FaUser } from 'react-icons/fa';

interface OptionsButtonProps {
  song: Song;
  artist: User;
  currentPlaylistId?: number; // Optional: ID of the playlist the song is in
}

const OptionsButton: React.FC<OptionsButtonProps> = ({ song, artist, currentPlaylistId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const submenuRef = useRef<HTMLDivElement | null>(null);

  const submenuClicked = useRef(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
    setSubMenuVisible(false); // Reset submenu visibility when toggling
  };

  const closeMenu = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      !submenuClicked.current
    ) {
      setShowMenu(false);
      setSubMenuVisible(false);
    }
    submenuClicked.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  const fetchPlaylists = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        toast.error('User not logged in');
        return;
      }
      const user = JSON.parse(storedUser);
      const response = await fetch(`/api/user/${user.username}/playlists`);
      if (!response.ok) throw new Error('Failed to fetch playlists');
      const data = await response.json();
      setUserPlaylists(data.playlists || []);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      toast.error('Failed to load playlists');
    }
  };

  const addSongToPlaylist = async (playlistId: number) => {
    try {
      const res = await fetch(`/api/playlist/${playlistId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId: song.id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.error === 'Song already exists in the playlist') {
          toast.error(`"${song.name}" is already in the playlist.`);
          return;
        }
        throw new Error(errorData.message || 'Failed to add song to playlist');
      }

      toast.success(`Added "${song.name}" to playlist successfully!`);
      if (currentPlaylistId) {
        window.location.reload();
      }
      setShowMenu(false);
      setSubMenuVisible(false);
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      toast.error('Failed to add song to playlist');
    }
  };

  const removeSongFromPlaylist = async () => {
    try {
      if (!currentPlaylistId) {
        toast.error('No playlist specified.');
        return;
      }
      const res = await fetch(`/api/playlist/${currentPlaylistId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId: song.id }),
      });
      if (!res.ok) throw new Error('Failed to remove song from playlist');
      toast.success(`Removed "${song.name}" from the playlist.`);
      if (currentPlaylistId) {
        window.location.reload(); // Only refresh if on a playlist
      }
      setShowMenu(false);
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      toast.error('Failed to remove song from playlist');
    }
  };

  const handleAddToPlaylistClick = async () => {
    await fetchPlaylists();
    setSubMenuVisible(true);
  };

  return (
    <div className="relative">
      {/* Options Button */}
      <button ref={buttonRef} className="text-gray-400 hover:text-white transition" onClick={toggleMenu}>
        ⋮
      </button>

      {/* First Menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute bg-gray-800 shadow-lg rounded-md p-2 z-50 w-48"
          style={{
            top:
              buttonRef.current &&
              window.innerHeight - buttonRef.current.getBoundingClientRect().bottom < 200
                ? '-200%' // Adjust to appear above if close to the bottom
                : '100%', // Default to below the button
            right: '0',
          }}
        >
          <div
            className="cursor-pointer p-2 rounded text-white hover:bg-gray-700 flex items-center justify-between"
            onClick={handleAddToPlaylistClick}
          >
            <FaPlus className="mr-2" /> Add to Playlist <span className="ml-2">▶</span>
          </div>
          {currentPlaylistId && (
            <div
              className="cursor-pointer p-2 rounded text-white hover:bg-gray-700 flex items-center"
              onClick={removeSongFromPlaylist}
            >
              <FaTrash className="mr-2" /> Remove from Playlist
            </div>
          )}
          <div
            className="cursor-pointer p-2 rounded text-white hover:bg-gray-700 flex items-center"
            onClick={() => (window.location.href = `/player/artist/${artist.username}`)}
          >
            <FaUser className="mr-2" /> Go to Artist
          </div>
        </div>
      )}

      {/* Second Submenu */}
      {subMenuVisible && (
        <div
          ref={submenuRef}
          className="absolute bg-gray-800 shadow-lg rounded-md p-2 z-50 w-48 max-h-48 overflow-y-auto"
          style={{
            top:
              buttonRef.current &&
              window.innerHeight - buttonRef.current.getBoundingClientRect().bottom < 200
                ? '-200%' // Adjust to appear above if close to the bottom
                : '100%', // Default to below the button
            right: '0',
          }}
          onMouseDown={() => {
            submenuClicked.current = true;
          }}
        >
          {userPlaylists.length > 0 ? (
            userPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="cursor-pointer p-2 hover:bg-gray-700 rounded text-white w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  addSongToPlaylist(playlist.id);
                }}
              >
                {playlist.name}
              </div>
            ))
          ) : (
            <div className="text-gray-400 p-2">No playlists available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionsButton;
