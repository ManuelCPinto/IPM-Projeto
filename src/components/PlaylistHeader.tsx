import React from "react";
import { FaShuffle } from "react-icons/fa6";
import Image from "next/image";

interface PlaylistHeaderProps {
  name: string;
  author: string;
  imageURL: string;
}

export const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ name, author, imageURL }) => {
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
