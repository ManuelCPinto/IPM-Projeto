'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Album, Genre, Descriptor, Review } from '@/database/schema'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export interface FeaturedAlbumReview {
  album: Album
  genres: Genre[] | string[]
  descriptors: Descriptor[]
  featuredReview: Review | null
}

interface FeaturedReviewsProps {
  featuredReviews: FeaturedAlbumReview[] | null
  error: string | null
  loading: boolean
}

const FeaturedReviews: React.FC<FeaturedReviewsProps> = ({ featuredReviews, error }) => {
  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  if (!featuredReviews || featuredReviews.length === 0) {
    return <div
     className="text-white"></div>
  }
  
 // Function to render stars with half-star support
 const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full Star
      stars.push(<FaStar key={i} className="text-yellow-400 w-5 h-5" />);
    } else if (rating >= i - 0.5) {
      // Half Star
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-5 h-5" />);
    } else {
      // Empty Star
      stars.push(<FaRegStar key={i} className="text-gray-600 w-5 h-5" />);
    }
  }
  return stars;
};

  return (
    <div className="space-y-6">
      {featuredReviews.map(({ album, genres, descriptors, featuredReview }) => (
        <div
          key={album.id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 bg-gray-900 p-6 rounded-lg shadow-lg"
        >
          {/* Album Details */}
          <div>
            <Image
              src={album.cover}
              alt={`${album.name} Cover`}
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
            <div className="mt-4">
              <h2 className="text-3xl font-semibold text-white">{album.rating}</h2>
              <p className="text-gray-400">from {album.rated.toLocaleString()} ratings</p>
              <h3 className="mt-4 font-bold uppercase text-gray-400">Genres</h3>
              <p> {genres.join(', ')}</p>
              <h3 className="mt-4 font-bold uppercase text-gray-400">Descriptors</h3>
              <p>{descriptors.join(', ')}</p>
            </div>
          </div>

          {/* Featured User Review */}
            <div>
              <Link href={`/player/ratings/albums/${album.id}`}>
                <h1 className="text-2xl font-semibold text-blue-400 hover:underline cursor-pointer">{album.name}</h1>
              </Link>
              <h2 className="text-xl text-gray-300 mt-1">{album.artist}</h2>
              <p className="text-gray-500 text-sm">
                Review by <span className="text-blue-400">{featuredReview.user}</span>
              </p>
              <div className="flex items-center mt-2">
                {renderStars(featuredReview.stars)}
              </div>
              <blockquote className="italic text-gray-400 mt-4">&quot;{featuredReview.content}&quot;</blockquote>
            </div>
        </div>
      ))}
    </div>
  )
}

export default FeaturedReviews
