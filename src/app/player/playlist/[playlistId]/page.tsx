'use client';

import React, { useState } from 'react';
import './playlist.css';
import './playlistHeader.css';

interface PlaylistProps {
  name: string;
  author: string;
  imageURL: string;
  songs: { name: string; author: string; album: string; duration: string }[];
}

{/* Temporary base example */}
const songs = [
  { name: 'A Minha Casinha', author: 'Xutos e Pontapés', album: '88', duration: '2:24' },
  { name: 'Contentores', author: 'Xutos e Pontapés', album: '88', duration: '3:30' },
  { name: 'Circo de Feras', author: 'Xutos e Pontapés', album: 'Circo de Feras', duration: '4:12' },
];

{/* Temporary base example remove when implemented with the rest*/}
export default function App() {
  return (
    <Playlist
      name="88"
      author="Xutos e Pontapés"
      imageURL="/playlistlogo.png"
      songs={songs}
    />
  );
}

function Playlist({ name, author, imageURL, songs }: PlaylistProps) {
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const [activePopup, setActivePopup] = useState<number | null>(null);

  const togglePopup = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (activePopup === index) {
      // Close popup
      setActivePopup(null);
      setPopupPosition(null);
    } else {
      // Open popup and calculate position
      const buttonRect = event.currentTarget.getBoundingClientRect();

    // Calculate initial position
    let top = buttonRect.bottom + window.scrollY;
    let left = buttonRect.left + window.scrollX;

    // Adjust position if popup exceeds viewport
    const popupWidth = 150; // Set a reasonable estimated width for the popup
    const popupHeight = 100; // Set a reasonable estimated height for the popup

    if (left + popupWidth > window.innerWidth) {
      left = window.innerWidth - popupWidth - 10; // Move left to fit, with 10px padding
    }

    if (top + popupHeight > window.innerHeight) {
      top = window.innerHeight - popupHeight - 10; // Move up to fit, with 10px padding
    }

    setPopupPosition({ top, left });
    setActivePopup(index);
    }
  };

  if (!songs) return <div>Loading...</div>;
  if (songs.length === 0) return <div>No songs found</div>;
  if (!name || !author) return <div>Missing album or band name</div>;
  if (!imageURL) return <div>Missing logo URL</div>;

  return (
    <div className="main">
      <div className="album-header">
        <div className="album-info">
          <img src={imageURL} className="playlist-logo" alt="Playlist Logo" />
          <div className="band-info">
            <h1 className="album-name">{name}</h1>
            <h2 className="band-name"><strong>{author}</strong></h2>
          </div>
        </div>
        <div className="playlist-options">
          <button className="playlist-play-button">
            <div className="playlist-play-triangle-icon"></div>
          </button>
          <button className="shuffle-button">
            {/* Shuffle Icon */}
          </button>
          <button className="playlist-like-button">♥</button>
          <button className="playlist-options-button">⋮</button>
        </div>
      </div>
      <div className="table-header-container">
        <div className="table-header-item">
          <div className="table-header-row">
            <div className="table-header-name">name</div>
            <div className="table-header-author">author</div>
            <div className="table-header-album">Album</div>
            <div className="table-header-duration">Duration</div>
          </div>
        </div>
      </div>
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
                  position: 'absolute',
                }}
              >
                <div className="popup-item">Add to Playlist</div>
                <div className="popup-item">Share</div>
                <div className="popup-item">Remove</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}