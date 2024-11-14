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
    <div>
      <div className="album-header">
        <img src={logoUrl} className="playlist-logo" alt="Playlist Logo" />
        <div className="band-info">
          <h1 className="album-name"><strong>{albumName}</strong></h1>
          <h2 className="band-name"><strong>{bandName}</strong></h2>
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
              <div className="song-album">{song.album}</div>
              <div className="song-duration">{song.duration}</div>
            </div>
            <button className="options-button">⋮</button>
          </div>
        ))}
      </div>
    </div>
  );
}