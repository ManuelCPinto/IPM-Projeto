import { User } from "@/database/entities/user";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { toast } from 'react-hot-toast';
import { Song } from '@/database/schema';

interface PlaylistTableProps {
  songs: Song[];
}

export const PlaylistTable: React.FC<PlaylistTableProps> = ({ songs }) => {
  const [user, setUser] = useState<User | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const [activePopup, setActivePopup] = useState<number | null>(null);
  const [userPlaylists, setPlaylists] = useState<any[]>([]);
  const [playlistPopupPosition, setPlaylistPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const [activePlaylistPopup, setActivePlaylistPopup] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const playlistPopupRef = useRef<HTMLDivElement | null>(null);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      toast.error('User not logged in');
    }
  }, []);

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

  // Fetch playlists whenever the user is set
  useEffect(() => {
    if (user) {
      fetchPlaylists();
    }
  }, [user]);

  const addSongToPlaylist = async (playlistId: string, songIdentifyer: number) => {
    try {
      console.log('Adding song with ID:', songIdentifyer); // Debugging log
      const res = await fetch(`/api/playlist/${playlistId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId: songIdentifyer }),
      });

      if (!res.ok) {
        throw new Error('Failed to add song to playlist');
      }

      toast.success('Song added to playlist!');
      setActivePlaylistPopup(null);
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      toast.error('Failed to add song to playlist');
    }
  };

  const togglePopup = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (activePopup === index) {
      setActivePopup(null);
      setPopupPosition(null);
    } else {
      const buttonRect = event.currentTarget.getBoundingClientRect();
      const popupWidth = 170;
      const popupHeight = 176;

      let top = buttonRect.bottom + window.scrollY;
      let left = buttonRect.left + window.scrollX + popupWidth * 0.5;

      if (left + popupWidth > window.innerWidth) {
        left = window.innerWidth - popupWidth - 5;
      }

      if (top + popupHeight > window.innerHeight + window.scrollY) {
        top = window.innerHeight + window.scrollY - popupHeight - 10;
      }

      setPopupPosition({ top, left });
      setActivePopup(index);
    }
  };

  const togglePlaylistPopup = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    if (activePlaylistPopup === index) {
      setActivePlaylistPopup(null);
      setPlaylistPopupPosition(null);
    } else {
      const buttonRect = event.currentTarget.getBoundingClientRect();
      const popupWidth = 200;
      const popupHeight = 200;

      let top = buttonRect.bottom + window.scrollY;
      let left = buttonRect.left + window.scrollX;

      if (left + popupWidth > window.innerWidth) {
        left = window.innerWidth - popupWidth - 5;
      }

      if (top + popupHeight > window.innerHeight + window.scrollY) {
        top = window.innerHeight + window.scrollY - popupHeight - 10;
      }

      setPlaylistPopupPosition({ top, left });
      setActivePlaylistPopup(index);
    }
  };

  const closePopups = () => {
    setActivePopup(null);
    setPopupPosition(null);
    setActivePlaylistPopup(null);
    setPlaylistPopupPosition(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (popupRef.current && !popupRef.current.contains(event.target as Node)) &&
        (playlistPopupRef.current && !playlistPopupRef.current.contains(event.target as Node))
      ) {
        closePopups();
      }
    };

    const handleScroll = () => {
      closePopups();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="playlist-table">
      {/* Table Header */}
      <div className="table-header-container">
        <div className="table-header-item">
          <div className="table-header-row">
            <div className="table-header-title">Title</div>
            <div className="table-header-artist">Artist</div>
            <div className="table-header-album">Album</div>
            <div className="table-header-duration">Duration</div>
          </div>
        </div>
      </div>

      {/* Playlist Body */}
      <div className="playlist-container">
        {songs.map((song, index) => (
          <div key={index} className="song-item">
            <button className="circle-play-button">
              <div className="triangle-icon"></div>
            </button>
            <div className="song-info">
              <div className="song-name">{song.name}</div>
              <div className="song-author">{song.author}</div>
              <div className="song-album">{song.albumId}</div>
              <div className="song-duration">{song.duration}</div>
            </div>
            <button className="like-button">♥</button>
            <button
              className="options-button"
              onClick={(e) => togglePopup(index, e)}
            >
              ⋮
            </button>
            {activePopup === index && popupPosition && (
              <div
                ref={popupRef}
                className="popup-menu"
                style={{
                  top: popupPosition.top,
                  left: popupPosition.left,
                  position: "absolute",
                }}
              >
                <div
                  className="popup-item"
                  onClick={(e) => togglePlaylistPopup(index, e)}
                >
                  Add to Playlist
                </div>
                <Link href={`/player/author/${song.author}`} className="popup-item">Go to Artist</Link>
              </div>
            )}
            {activePlaylistPopup === index && playlistPopupPosition && (
              <div
                ref={playlistPopupRef}
                className="playlist-popup-menu"
                style={{
                  top: playlistPopupPosition.top - 20, // Adjust top dynamically
                  left: playlistPopupPosition.left - 85, // Adjust left dynamically
                  position: "absolute",
                  zIndex: 2000, // Ensure it appears above other elements
                }}
              >
                {userPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="playlist-item"
                    onClick={() => addSongToPlaylist(playlist.id, song.id)}
                  >
                    {playlist.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
