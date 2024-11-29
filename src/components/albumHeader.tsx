import React from "react";
import { FaShuffle } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface AlbumHeaderProps {
  name: string;
  author: string;
  imageURL: string;
}


export const AlbumHeader: React.FC<AlbumHeaderProps> = ({ name, author, imageURL }) => {
  const { albumId } = useParams();

  if (!name || !author || !imageURL) {
    return <div>Missing album details</div>;
  }

  return (
    <div className="w-full bg-gray-800 rounded-lg p-6 flex items-center">
      {/* Album Cover */}
      <div className="flex flex-col items-center">
        <Image
          src={imageURL}
          alt="Album Art"
          width={180}
          height={180}
          className="rounded-lg object-cover"
        />
        {/* Buttons Below Cover */}
        <div className="flex mt-4 space-x-4">
          <button className="text-white text-2xl hover:text-gray-400 transition">
            ▶
          </button>
          <button className="text-white text-2xl hover:text-gray-400 transition">
            <FaShuffle />
          </button>
          <button className="text-white text-2xl hover:text-gray-400 transition">
            ♥
          </button>
          <Link
              href={`/player/ratings/albums/${albumId}`}
              className="text-white text-lg font-medium bg-gray-700 hover:bg-gray-600 transition rounded-lg px-4 py-2"
            >
            Review
            </Link>
        </div>
      </div>

      {/* Album Info */}
      <div className="ml-8 flex flex-col">
        <h1 className="text-white text-5xl font-bold">{name}</h1>
        <h2 className="text-gray-400 text-2xl mt-2">{author}</h2>
      </div>
    </div>
  );
};
