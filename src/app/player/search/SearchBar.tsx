'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';

interface SearchResult {
  id: number | string;
  name: string;
  type: 'Album' | 'Song' | 'Artist' | 'Playlist';
  cover?: string;
  picture?: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleResultClick = (item: SearchResult) => {
    switch (item.type) {
      case 'Album':
        router.push(`/player/album/${item.id}`);
        break;
      case 'Song':
        router.push(`/player/songs/${item.id}`);
        break;
      case 'Artist':
        router.push(`/player/artist/${item.id}`);
        break;
      case 'Playlist':
        router.push(`/player/playlists/${item.id}`);
        break;
      default:
        console.error('Unknown type:', item.type);
    }
    setQuery('');
    setSearchResults([]);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="flex items-center bg-gray-900 rounded-full px-4 py-2 shadow-md">
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search albums, songs, artists, or playlists..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow clicking results
          className="bg-transparent text-white focus:outline-none w-full placeholder-gray-500 text-sm"
        />
      </div>

      {isFocused && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          <ul className="py-2">
            {searchResults.slice(0, 5).map((item) => (
              <li
                key={`${item.type}-${item.id}`}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
                onClick={() => handleResultClick(item)}
              >
                {/* Show profile picture for artists, otherwise show the cover */}
                <Image
                  src={item.picture || item.cover || '/default-cover.png'}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded-md mr-3"
                />
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.type}</p>
                </div>
              </li>
            ))}
            {searchResults.length > 5 && (
              <li className="px-4 py-2 text-gray-500 text-sm text-center">
                Scroll to see more...
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
