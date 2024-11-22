import React, { useEffect, useRef, useState } from "react";

interface Song {
  name: string;
  author: string;
  album: string;
  duration: string;
}

interface AuthorMusicTableProps {
  songs: Song[];
}

export const AuthorMusic: React.FC<AuthorMusicTableProps> = ({ songs }) => {
    const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
    const [activePopup, setActivePopup] = useState<number | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

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

    const closePopup = () => {
        setActivePopup(null);
        setPopupPosition(null);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (
            popupRef.current &&
            !popupRef.current.contains(event.target as Node)
        ) {
            closePopup();
        }
        };

        const handleScroll = () => {
        closePopup();
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

  return (
    <div className="AuthorMusic-table">
      {/* Table Header */}
      <div className="table-header-container">
        <div className="table-header-item">
          <div className="table-header-row">
            <div className="table-header-title">Title</div>
            <div className="table-header-album">Album</div>
            <div className="table-header-duration">Duration</div>
          </div>
        </div>
      </div>

      {/* AuthorMusic Body */}
      <div className="AuthorMusic-container">
        {songs.map((song, index) => (
          <div key={index} className="song-item">
            <button className="circle-play-button">
              <div className="triangle-icon"></div>
            </button>
            <div className="song-info">
              <div className="song-name">{song.name}</div>
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
                ref={popupRef}
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