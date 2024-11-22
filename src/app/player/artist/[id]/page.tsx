'use client';

import React from 'react';
import '../components/styles/authorHeader.css';
import { AuthorHeader } from "../components/AuthorHeader";
import { AuthorInfo } from "../components/AuthorInfo";
import { AuthorMusic } from "../components/AuthorMusic";
import { AuthorAlbums } from '../components/AuthorAlbums';

interface PlaylistProps {
  author: string;
  imageURL: string;
  info: string;
  songs: { name: string; author: string; album: string; duration: string }[];
  albums: { title: string; cover: string; }[];
}

{/* Temporary base example */}
const songs = [
  { name: 'A Minha Casinha', author: 'Xutos e Pontapés', album: '88', duration: '2:24' },
  { name: 'Contentores', author: 'Xutos e Pontapés', album: '88', duration: '3:30' },
  { name: 'Circo de Feras', author: 'Xutos e Pontapés', album: 'Circo de Feras', duration: '4:12' },
  { name: 'A Minha Casinha', author: 'Xutos e Pontapés', album: '88', duration: '2:24' },
  { name: 'Contentores', author: 'Xutos e Pontapés', album: '88', duration: '3:30' },
];

const albums = [
  { title: '88', cover: '/playlistlogo.png' },
  { title: 'Circo de Feras', cover: '/playlistlogo.png' },
  { title: 'Dizer Não de Vez', cover: '/playlistlogo.png' },
  { title: '78-82', cover: '/playlistlogo.png' },
  { title: 'Circo de Feras', cover: '/playlistlogo.png' },
];

{/* Temporary base example remove when implemented with the rest*/}
export default function App() {
  return (
    <Author
      author="Xutos e Pontapés"
      imageURL="/playlistlogo.png"
      info="Xutos e Pontapés is a Portuguese rock band, formed in 1978, in Lisbon. The group started off in the local punk rock scene and set the trend for the emerging Portuguese rock of the 1980s."
      songs={songs}
      albums={albums}
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
function Author({ author, imageURL, info, songs, albums }: PlaylistProps) {

  return (
    <div className="main">
      <AuthorHeader author={author} imageURL={imageURL} />
      <div className="author-stuff">
          <AuthorInfo info={info} />
          <AuthorMusic songs={songs} />
      </div>
      <AuthorAlbums albums={albums}/>
    </div>
  );
};