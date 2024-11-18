// AlbumPage.jsx
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import albumData from '../../albumData';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const AlbumPage: React.FC = () => {
  const { albumId } = useParams();
  const album = albumData.find((item) => item.id === albumId);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState(album ? album.reviews : []);

  if (!album) {
    return <div className="text-white">Album not found</div>;
  }

  // Calculate total number of reviews
  const totalReviews = reviews.length;

  // Function to handle review submission
  const handleReviewSubmit = () => {
    if (userReview.trim() !== '') {
      const newReview = {
        user: 'Current User', // depois mudar com bd
        date: new Date().toLocaleDateString(),
        stars: userRating,
        content: userReview,
      };
      setReviews([newReview, ...reviews]);
      setUserRating(0);
      setUserReview('');
    } else {
      alert('Please write a review before submitting.');
    }
  };

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

  // Function to handle star click with half-star support
  const handleStarClick = (e: React.MouseEvent, starValue: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;
    const clickRatio = clickX / width;
    const newRating = clickRatio > 0.5 ? starValue : starValue - 0.5;
    setUserRating(newRating);
  };

  // Function to handle star hover with half-star support
  const handleStarHover = (e: React.MouseEvent, starValue: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const hoverX = e.clientX - left;
    const hoverRatio = hoverX / width;
    const newHoverRating = hoverRatio > 0.5 ? starValue : starValue - 0.5;
    setHoverRating(newHoverRating);
  };

  const resetHoverRating = () => setHoverRating(0);

  return (
    <div className="p-8 text-white">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8">
        {/* Left Column */}
        <div className="space-y-8 bg-gray-900 p-6 rounded-lg">
          {/* Album Cover */}
          <div className="flex justify-center">
            <img
              src={album.cover}
              alt={`${album.name} Cover`}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>

          {/* Tracklist */}
          <div>
            <h2 className="text-xl font-bold text-gray-200 border-b border-gray-500 pb-3">
              Tracklist
            </h2>
            <ul className="mt-4 divide-y divide-gray-700">
              {album.tracklist.map((track, index) => (
                <li key={index} className="py-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200 font-medium">
                      {index + 1}. {track.name}
                      {track.feature && (
                        <span className="text-gray-400 ml-2">
                          (feat. {track.feature})
                        </span>
                      )}
                    </span>
                    <span className="text-gray-400">{track.duration}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Header with Album Name */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h1 className="text-4xl font-bold">{album.name}</h1>
            <p className="text-lg text-gray-300 mt-1">by {album.artist}</p>
            <div className="border-b border-gray-500 mt-4"></div>
          </div>

          {/* Detailed Album Info */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-gray-200">Type:</span> {album.type}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-gray-200">Released:</span> {album.releaseDate}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-gray-200">Recorded:</span> {album.recorded}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-gray-200">Language:</span> {album.language}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-gray-200">Rating:</span> {album.rating} / 5.0
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-gray-200">Rated:</span>{' '}
                  {album.rated.toLocaleString()} ratings
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-gray-200">Ranked:</span> {album.ranked}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-bold uppercase text-gray-400">Genres</h3>
              <p className="text-gray-200">{album.genres.join(', ')}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-bold uppercase text-gray-400">Descriptors</h3>
              <p className="text-gray-200">{album.descriptors.join(', ')}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-gray-700"></div>

          {/* Reviews Section */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-200 pb-3">
              Reviews ({totalReviews})
            </h2>

            {/* Add Review Section */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-200">Submit Your Review</h3>
              {/* Star Rating Input */}
              <div className="mt-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-300">
                  Your Rating:
                </label>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }, (_, i) => {
                    const starValue = i + 1;
                    const isFilled =
                      (hoverRating || userRating) >= starValue
                        ? 'full'
                        : (hoverRating || userRating) >= starValue - 0.5
                        ? 'half'
                        : 'empty';

                    return (
                      <div
                        key={i}
                        className="cursor-pointer"
                        onClick={(e) => handleStarClick(e, starValue)}
                        onMouseMove={(e) => handleStarHover(e, starValue)}
                        onMouseLeave={resetHoverRating}
                      >
                        {isFilled === 'full' && <FaStar className="text-yellow-400 w-6 h-6" />}
                        {isFilled === 'half' && <FaStarHalfAlt className="text-yellow-400 w-6 h-6" />}
                        {isFilled === 'empty' && <FaRegStar className="text-gray-600 w-6 h-6" />}
                      </div>
                    );
                  })}
                  <span className="ml-2 text-gray-300">
                    {(hoverRating || userRating) > 0
                      ? (hoverRating || userRating) + ' Stars'
                      : '0 Stars'}
                  </span>
                </div>
              </div>
              {/* Review Textarea */}
              <div className="mt-4">
                <label htmlFor="review" className="block text-sm font-medium text-gray-300">
                  Your Review
                </label>
                <textarea
                  id="review"
                  name="review"
                  rows={4}
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  className="mt-2 p-2 w-full rounded-md bg-gray-800 text-gray-200"
                  placeholder="Write your thoughts about the album..."
                />
              </div>
              <button
                className="mt-4 px-4 py-2 bg-gray-600 hover:bg-blue-700 rounded-md"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
            </div>

            {/* Reviews List */}
            {reviews.map((review, index) => (
              <div key={index} className="mt-6 border-b border-gray-800 pb-6">
                <div className="flex items-center">
                  {/* Profile Picture */}
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-200 font-bold">
                    {/* Placeholder initials */}
                    {review.user.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-200 font-semibold">{review.user}</p>
                    <p className="text-gray-300 text-sm">{review.date}</p>
                  </div>
                </div>
                {/* Star Rating */}
                <div className="flex items-center mt-2">
                  {renderStars(review.stars)}
                </div>
                {/* Review Content */}
                <p className="text-gray-200 mt-4 leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
