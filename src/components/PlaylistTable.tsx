import React, { useEffect, useState } from "react";
import { Song, User, Album } from "@/database/schema";
import PlayButton from "./PlayButton";
import { LikeButton } from "./LikeButton";
import OptionsButton from "./OptionsButton";

interface SongEntry {
  song: Song;
  artist: User;
  album: Album;
}

interface PlaylistTableProps {
  songs: SongEntry[];
  currentPlaylistId?: number; // Optional: Current playlist ID
}

export const PlaylistTable: React.FC<PlaylistTableProps> = ({ songs, currentPlaylistId }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.username); // Assuming the `username` field identifies the user
    }
  }, []);

  if (!user) {
    return (
      <div className="text-gray-400 text-center">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 text-white p-6 rounded-lg">
      {/* Header */}
      <div className="grid grid-cols-[50px_3fr_2fr_2fr_1fr_50px] text-sm font-semibold uppercase border-b border-gray-700 pb-2">
        <span></span> {/* Empty space for Play Button */}
        <span>Title</span>
        <span>Artist</span>
        <span>Album</span>
        <span className="text-right">Duration</span>
        <span></span> {/* Empty space for Actions */}
      </div>

      {/* Songs */}
      <div className="divide-y divide-gray-700">
        {songs.map((entry, index) => (
          <div
            key={index}
            className="grid grid-cols-[50px_3fr_2fr_2fr_1fr_50px] items-center py-4"
          >
            {/* Play Button */}
            <div className="flex items-center justify-center">
              <PlayButton song={entry.song} album={entry.album} author={entry.artist} />
            </div>

            {/* Song Title */}
            <div className="font-bold text-gray-300">{entry.song.name}</div>

            {/* Artist */}
            <div className="text-gray-400">{entry.artist.name}</div>

            {/* Album */}
            <div className="text-gray-400">{entry.album.name}</div>

            {/* Duration */}
            <div className="text-right text-gray-400">{entry.song.duration}</div>

            {/* Options */}
            <div className="flex items-center space-x-4 justify-end">
              <LikeButton
                songId={entry.song.id}
                userId={user} 
              />
              <OptionsButton 
                song={entry.song} 
                artist={entry.artist} 
                currentPlaylistId={currentPlaylistId} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
