'use client';
import React from 'react';
import utopiaCover from './utopia.webp';
import cureCover from './cure.webp';

const reviews = [
  {
    cover: utopiaCover.src,
    rating: '3.57',
    ratingsCount: '920',
    genres: ['Southern Hip Hop', 'Experimental Hip Hop', 'Trap'],
    descriptors: [
      'psychedelic',
      'dark',
      'nocturnal',
      'progressive',
      'male vocalist',
      'drugs',
      'hedonistic',
    ],
    title: 'Utopia (2023)',
    artist: 'Travis Scott',
    reviewer: 'silveira',
    quote: "f e i n.",
    stars: '★★★★☆',
    content:
      'This an album that i didnt enjoy when it was first released. I thought that the beats were boring and I thought that the songs were meaningless and just too long. But, after listening to it another time, i realized that this album is beyond amazing. The beats make you want to float and the lyrics have so much meaning that i can picture myself in the scenario described by Travis. And the album has so many good features making it even better!',
  },
  {
    cover: cureCover.src,
    rating: '3.91',
    ratingsCount: '9467',
    genres: ['Gothic Rock', 'Alternative Rock'],
    descriptors: ['melancholy', 'dark', 'ethereal', 'emotional'],
    title: 'Songs of a Lost World (2024)',
    artist: 'The Cure',
    reviewer: 'pai do silveira',
    quote: 'siuuuu',
    stars: '★★★★★',
    content:
      'The Cure returns with their signature sound... [Add full review here]',
  },
];

const FeaturedReviews: React.FC = () => {
  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 bg-neutral-800 p-6 rounded-lg shadow-lg">
          {/* Album Details */}
          <div>
            <img
              src={review.cover}
              alt={`${review.title} Cover`}
              className="rounded-lg w-full"
            />
            <div className="mt-4">
              <h2 className="text-3xl font-semibold">{review.rating}</h2>
              <p className="text-gray-400">from {review.ratingsCount} ratings</p>
              <h3 className="mt-4 font-bold uppercase text-gray-400">Genres</h3>
              <p>{review.genres.join(', ')}</p>
              <h3 className="mt-4 font-bold uppercase text-gray-400">
                Descriptors
              </h3>
              <p>{review.descriptors.join(', ')}</p>
            </div>
          </div>

          {/* User Review */}
          <div>
            <h1 className="text-2xl font-semibold text-blue-400">
              {review.title}
            </h1>
            <h2 className="text-xl text-gray-300 mt-1">{review.artist}</h2>
            <p className="text-gray-500 text-sm">
              Review by{' '}
              <span className="text-blue-400">{review.reviewer}</span>
            </p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400 text-lg">{review.stars}</span>
            </div>
            <blockquote className="italic text-gray-400 mt-4">
              "{review.quote}"
            </blockquote>
            <p className="text-gray-300 mt-4 leading-relaxed">
              {review.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedReviews;
