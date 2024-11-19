import React from 'react';
import './playlist.css';
import './playlistHeader.css';

interface PlaylistProps {
  albumName: string;
  bandName: string;
  logoUrl: string;
  songs: { title: string; artist: string; album: string; duration: string }[];
}

{/* Temporary base example */}
const songs = [
  { title: 'A Minha Casinha', artist: 'Xutos e Pontapés', album: '88', duration: '2:24' },
  { title: 'Contentores', artist: 'Xutos e Pontapés', album: '88', duration: '3:30' },
  { title: 'Circo de Feras', artist: 'Xutos e Pontapés', album: 'Circo de Feras', duration: '4:12' },
];

{/* Temporary base example remove when implemented with the rest*/}
export default function App() {
  return (
    <Playlist
      albumName="88"
      bandName="Xutos e Pontapés"
      logoUrl="/playlistlogo.png"
      songs={songs}
    />
  );
}

function Playlist({ albumName, bandName, logoUrl, songs }: PlaylistProps) {
  if (!songs) return <div>Loading...</div>;
  if (songs.length === 0) return <div>No songs found</div>;
  if (!albumName || !bandName) return <div>Missing album or band name</div>;
  if (!logoUrl) return <div>Missing logo URL</div>;

  return (
    <div className='main'>
      <div className="album-header">
        <div className='album-info'>
          <img src={logoUrl} className="playlist-logo" alt="Playlist Logo" />
          <div className="band-info">
            <h1 className="album-name">{albumName}</h1>
            <h2 className="band-name"><strong>{bandName}</strong></h2>
          </div>
        </div>
        <div className='playlist-options'>
          <button className="playlist-play-button">
            <div className="playlist-play-triangle-icon"></div>
          </button>
          <button className="shuffle-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20" height="20" /* Adjust size as needed */
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </button>
          <button className="playlist-like-button">♥</button>
          <button className="playlist-options-button">⋮</button>
        </div>
      </div>
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
      <div className="playlist-container">
        {songs.map((song, index) => (
          <div key={index} className="song-item">
            <button className="circle-play-button">
              <div className="triangle-icon"></div>
            </button>
            <div className="song-info">
              <div className="song-title">{song.title}</div>
              <div className="song-artist">{song.artist}</div>
              <div>
                <div className="song-album">{song.album}</div>
                
              </div>
              <div className="song-duration">{song.duration}</div>
            </div>
            <button className="like-button">♥</button>
            <button className="options-button">⋮</button>
          </div>
        ))}
      </div>
    </div>
  );
}