'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

interface SearchResult {
  id: number;
  name: string;
  type: 'Album' | 'Song' | 'Artist';
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
        router.push(`/player/ratings/albums/${item.id}`);
        break;
      case 'Song':
        router.push(`/player/songs/${item.id}`);
        break;
      case 'Artist':
        router.push(`/player/artists/${item.id}`);
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
          placeholder="Search albums, songs, or artists..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow clicking results
          className="bg-transparent text-white focus:outline-none w-full placeholder-gray-500 text-sm"
        />
      </div>

      {isFocused && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-lg z-10">
          <ul className="py-2">
            {searchResults.map((item) => (
              <li
                key={`${item.type}-${item.id}`}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex justify-between"
                onClick={() => handleResultClick(item)}
              >
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.type}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
