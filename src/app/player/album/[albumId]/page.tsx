'use client';

import React from 'react';
import '@/components/styles/PlaylistTable.css';
import '@/components/styles/playlistHeader.css';
import { PlaylistHeader } from "@/components/PlaylistHeader";
import { PlaylistTable } from "@/components/PlaylistTable";

interface PlaylistProps {
  name: string;
  author: string;
  imageURL: string;
  songs: {
    name: string;
    author: string;
    album: string;
    duration: string;
  }[];
}

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
  { name: 'A Minha Casinha', author: 'Xutos e Pontapés', album: '88', duration: '2:24' },
  { name: 'Contentores', author: 'Xutos e Pontapés', album: '88', duration: '3:30' },
  { name: 'Circo de Feras', author: 'Xutos e Pontapés', album: 'Circo de Feras', duration: '4:12' },
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

/*
const PlaylistPage = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState<Playlist>(); 
    const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetchPlaylist();
    fetchSongs();
  }, [playlistId]);


  const fetchPlaylist = async () =>  {
    const response = await fetch(`/api/playlist/${playlistId}`);
    const data = await response.json();
    setPlaylist(data);
  }
}
*/

function Playlist({ name, author, imageURL, songs }: PlaylistProps) {
  if (!songs) return <div>Loading...</div>;
  if (songs.length === 0) return <div>No songs found</div>;

  return (
    <div className="main">
      <PlaylistHeader name={name} author={author} imageURL={imageURL} />
      <PlaylistTable songs={songs} />
    </div>
  );
};
