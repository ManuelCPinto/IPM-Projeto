import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Playlist, User } from "@/database/schema";
import { LikeButton } from "./LikeButton";

export const PlaylistTable: React.FC<{ songs: any[] }> = ({ songs }) => {
  const [user, setUser] = useState<User | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const [activePopup, setActivePopup] = useState<number | null>(null);
  const [userPlaylists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistPopupPosition, setPlaylistPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const [activePlaylistPopup, setActivePlaylistPopup] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const playlistPopupRef = useRef<HTMLDivElement | null>(null);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      toast.error("User not logged in");
    }
  }, []);

  const fetchPlaylists = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/user/${user.username}/playlists`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }
      const data = await response.json();
      setPlaylists(data.playlists || []); // Ensure playlists are set in the state
    } catch (error) {
      console.error("Error fetching playlists:", error);
      toast.error("Failed to load playlists");
    }
  };

  useEffect(() => {
    if (user) fetchPlaylists();
  }, [user]);

  const addSongToPlaylist = async (playlistId: number, songId: number) => {
    try {
      const res = await fetch(`/api/playlist/${playlistId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId }),
      });

      if (!res.ok) {
        throw new Error("Failed to add song to playlist");
      }

      toast.success("Song added to playlist!");
      setActivePlaylistPopup(null);
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      toast.error("Failed to add song to playlist");
    }
  };

  const togglePopup = (songId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (activePopup === songId) {
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
      setActivePopup(songId);
    }
  };

  const togglePlaylistPopup = (songId: number, event: React.MouseEvent<HTMLDivElement>) => {
    if (activePlaylistPopup === songId) {
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
      setActivePlaylistPopup(songId);
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

    const handleScroll = () => closePopups();

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!songs || songs.length === 0) {
    return <div className="playlist-container">No songs available.</div>;
  }

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
        {songs.map((entry, index) => (
          <div key={index} className="song-item">
            <button className="circle-play-button">
              <div className="triangle-icon"></div>
            </button>
            <div className="song-info">
              <div className="song-name">{entry.song.name}</div>
              <div className="song-artist">{entry.artist}</div>
              <div className="song-album">{entry.album}</div>
              <div className="song-duration">{entry.song.duration}</div>
            </div>
            {/* Only render LikeButton if user is not null */}
            {user && (
              <LikeButton
                songId={entry.song.id}
                userId={user.username}
                initialLiked={entry.song.isLiked}
              />
            )}
            <button
              className="options-button"
              onClick={(e) => togglePopup(entry.song.id, e)}
            >
              ⋮
            </button>
            {activePopup === entry.song.id && popupPosition && (
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
                  onClick={(e) => togglePlaylistPopup(entry.song.id, e)}
                >
                  Add to Playlist
                </div>
                <Link href={`/player/author/${entry.artist}`} className="popup-item">
                  Go to Artist
                </Link>
              </div>
            )}
            {activePlaylistPopup === entry.song.id && playlistPopupPosition && (
              <div
                ref={playlistPopupRef}
                className="playlist-popup-menu"
                style={{
                  top: playlistPopupPosition.top,
                  left: playlistPopupPosition.left,
                  position: "absolute",
                  zIndex: 1000,
                }}
              >
                {userPlaylists.length > 0 ? (
                  userPlaylists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="playlist-item"
                      onClick={() => addSongToPlaylist(playlist.id, entry.song.id)}
                    >
                      {playlist.name}
                    </div>
                  ))
                ) : (
                  <div className="no-playlists">No playlists found</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
