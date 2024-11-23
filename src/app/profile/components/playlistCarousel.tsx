'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Playlist } from '@/database/schema';

const PlaylistCarousel = ({ playlists }: { playlists: Playlist[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -1000 : 1000;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const updateArrowVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateArrowVisibility);
      updateArrowVisibility();
      return () => {
        container.removeEventListener('scroll', updateArrowVisibility);
      };
    }
  }, []);

  return (
    <div className="relative w-full">
      {/* Scrollable Playlists */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide p-2"
      >
        {playlists.map((playlist) => (
          <Link key={playlist.id} href={`/player/playlist/${playlist.id}`}>
            <div className="min-w-[200px] flex-shrink-0 bg-gray-800 rounded-lg shadow hover:shadow-lg transition-transform cursor-pointer">
              {/* Playlist Cover */}
              <div className="relative w-full h-36">
                <Image
                  src={playlist.cover}
                  alt={playlist.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              {/* Playlist Info */}
              <div className="p-4">
                <h4 className="text-lg font-semibold truncate text-white">{playlist.name}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Left Scroll Button */}
      {showLeftArrow && (
        <button
          onClick={() => handleScroll('left')}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-neutral-700 text-white rounded-full p-2 shadow hover:bg-neutral-600 transition"
        >
          ←
        </button>
      )}

      {/* Right Scroll Button */}
      {showRightArrow && (
        <button
          onClick={() => handleScroll('right')}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-neutral-700 text-white rounded-full p-2 shadow hover:bg-neutral-600 transition"
        >
          →
        </button>
      )}
    </div>
  );
};

export default PlaylistCarousel;
