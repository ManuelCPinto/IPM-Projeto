import React from "react";
import Image from "next/image"; // Ensure you're using Next.js for this


interface Album {
  title: string;
  cover: string;
}

interface AuthorAlbumsProps {
  albums: Album[];
}

export const AuthorAlbums: React.FC<AuthorAlbumsProps> = ({ albums }) => {
  return (
    <div className="author-albums">
      <h2>Albums by the Author</h2>
      <div className="album-list">
        {albums.map((album, index) => (
          <div key={index} className="album-item">
            {/* Use the Next.js Image Component */}
            <Image 
              src={album.cover} 
              alt={`Cover of ${album.title}`} 
              width={200} 
              height={200} 
              className="album-cover"
              style={{ borderRadius: '4px' }} // Add rounded corners inline or via CSS
            />
            <p>{album.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
