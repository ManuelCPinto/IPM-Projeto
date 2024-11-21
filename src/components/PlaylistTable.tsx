import React, { useState } from "react";

interface Song {
  name: string;
  author: string;
  album: string;
  duration: string;
}

interface PlaylistTableProps {
  songs: Song[];
}

export const PlaylistTable: React.FC<PlaylistTableProps> = ({ songs }) => {
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const [activePopup, setActivePopup] = useState<number | null>(null);

  const togglePopup = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (activePopup === index) {
      setActivePopup(null);
      setPopupPosition(null);
    } else {
      const buttonRect = event.currentTarget.getBoundingClientRect();

      let top = buttonRect.bottom + window.scrollY;
      let left = buttonRect.left + window.scrollX;

      const popupWidth = 150;
      const popupHeight = 100;

      if (left + popupWidth > window.innerWidth) {
        left = window.innerWidth - popupWidth - 10;
      }

      if (top + popupHeight > window.innerHeight) {
        top = window.innerHeight - popupHeight - 10;
      }

      setPopupPosition({ top, left });
      setActivePopup(index);
    }
  };

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
              <div className="song-album">{song.album}</div>
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
                className="popup-menu"
                style={{
                  top: popupPosition.top,
                  left: popupPosition.left,
                  position: "absolute",
                }}
              >
                <div className="popup-item">Add to Liked</div>
                <div className="popup-item">Add to Playlist</div>
                <div className="popup-item">Review</div>
                <div className="popup-item">Go to Artist</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};