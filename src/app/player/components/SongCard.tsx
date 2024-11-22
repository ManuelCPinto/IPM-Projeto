import { Song } from '@/database/schema';

export function SongCard({ song }: { song: Song }) {
  return (
    <div className="flex flex-col w-48 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer overflow-hidden">
      {/* Song Cover Section */}
      <div className="relative w-full h-36">
        <img
          src={song.cover}
          alt={`${song.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
          <button className="bg-blue-500 p-3 rounded-full shadow-md hover:bg-blue-600">
            ▶
          </button>
        </div>
      </div>

      {/* Song Details Section */}
      <div className="p-3">
        <p className="text-sm font-bold text-white truncate">{song.name}</p>
        <p className="text-xs text-gray-400 truncate">
          {song.author}
          {song.feature ? ` feat. ${song.feature}` : ''}
        </p>
      </div>
    </div>
  );
}
