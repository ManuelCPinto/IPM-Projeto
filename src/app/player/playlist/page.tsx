import React from 'react';

export default function Playlist() {
  return (
    <div>
      <div style={styles.header}>
        <img src={"/playlistlogo.png"} style={styles.playlistlogo} alt="Playlist Logo"/>
        <div style={styles.bandInfo}>
          <h1 style={styles.albumName}><strong>88</strong></h1>
          <h2 style={styles.bandName}><strong>Xutos e Pontapés</strong></h2>
        </div>
      </div>
      <div style={styles.headerContainer}>
        <div style={styles.headerItem}>
          <div style={styles.headerRow}>
            <div style={styles.headerTitle}>Title</div>
            <div style={styles.headerArtist}>Artist</div>
            <div style={styles.headerAlbum}>Album</div>
            <div style={styles.headerDuration}>Duration</div>
          </div>
        </div>
      </div>
      <div style={styles.playlistContainer}>
        <div style={styles.songItem}>
          <div style={styles.songInfo}>
            <div style={styles.songTitle}>A Minha Casinha</div>
            <div style={styles.songArtist}>Xutos e Pontapés</div>
            <div style={styles.songAlbum}>88</div>
            <div style={styles.songDuration}>2:24</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  playlistContainer: {
    width: '100%',
    margin: '0 auto',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: '20px',
    borderRadius: '8px',
  },
  songItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #333',
  },
  songInfo: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 50px',
    columnGap: '10px',
  },
  songTitle: {
    fontWeight: 'bold',
  },
  songArtist: {
    color: '#ccc',
  },
  songAlbum: {
    color: '#777',
  },
  songDuration: {
    color: '#ccc',
    textAlign: 'right', // Right-align duration to match header
  },
  playButton: {
    backgroundColor: '#1db954',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  playlistlogo: {
    width: '200px',
    height: '200px',
    marginRight: '20px',
  },
  bandInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  albumName: {
    fontSize: '3.5rem',
    color: '#fff',
    margin: 0,
  },
  bandName: {
    fontSize: '2rem',
    color: '#777',
    margin: 0,
  },
  headerContainer: {
    width: '100%',
    margin: '0 auto',
    color: '#fff',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '10px',
    paddingTop: '10px',
  },
  headerItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '10px 0',
    paddingRight: '10px 0',
  },
  headerRow: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 50px',
    columnGap: '10px',
  },
  headerTitle: { color: '#777', textAlign: 'left' },
  headerArtist: { color: '#777', textAlign: 'left' },
  headerAlbum: { color: '#777', textAlign: 'left' },
  headerDuration: { color: '#777', textAlign: 'right' },
};
