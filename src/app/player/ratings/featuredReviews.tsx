// FeaturedReviews.jsx

'use client';
import React from 'react';
import albumData from './albumData';
import Link from 'next/link';

const FeaturedReviews: React.FC = () => {
  // Specify the album IDs you want to include
  const reviewAlbums = ['utopia', 'cure'];

  // Filter albumData to include only the specified albums
  const reviews = albumData.filter((album) =>
    reviewAlbums.includes(album.id)
  );

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 bg-gray-900 p-6 rounded-lg shadow-lg"
        >
          {/* Album Details */}
          <div>
            <img
              src={review.cover}
              alt={`${review.name} Cover`}
              className="rounded-lg w-full"
            />
            <div className="mt-4">
              <h2 className="text-3xl font-semibold">{review.rating}</h2>
              <p className="text-gray-400">
                from {review.rated.toLocaleString()} ratings
              </p>
              <h3 className="mt-4 font-bold uppercase text-gray-400">Genres</h3>
              <p>{review.genres.join(', ')}</p>
              <h3 className="mt-4 font-bold uppercase text-gray-400">
                Descriptors
              </h3>
              <p>{review.descriptors.join(', ')}</p>
            </div>
          </div>

          {/* User Review */}
          {review.review && (
            // Conditional rendering to handle optional review property
            <div>
              <Link href={`/player/ratings/albums/${review.id}`}>
                <h1 className="text-2xl font-semibold text-blue-400 hover:underline cursor-pointer">
                  {review.name}
                </h1>
              </Link>
              <h2 className="text-xl text-gray-300 mt-1">{review.artist}</h2>
              <p className="text-gray-500 text-sm">
                Review by{' '}
                <span className="text-blue-400">
                  {review.review.reviewer}
                </span>
              </p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400 text-lg">
                  {review.review.stars}
                </span>
              </div>
              <blockquote className="italic text-gray-400 mt-4">
                &quot;{review.review.quote}&quot;
              </blockquote>
              <p className="text-gray-300 mt-4 leading-relaxed">
                {review.review.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeaturedReviews;
