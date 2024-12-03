/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Album, Descriptor, Genre, Review, Song } from '@/database/schema';
import Image from 'next/image';
import LoadingSpinner from '@/components/loading';
import toast from 'react-hot-toast';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracklist, setTracklist] = useState<Song[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [descriptors, setDescriptors] = useState<Descriptor[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [userReview, setUserReview] = useState<string>('');
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAlbum();
    fetchTracklist();
    fetchGenres();
    fetchDescriptors();
    fetchReviews();
  }, [albumId]);

  const fetchAlbum = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/albums/${albumId}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error fetching album');
      }
      const data = await res.json();
      setAlbum(data);
    } catch (error: any) {
      console.error('Error fetching album:', error.message || error);
      setError(error.message || 'Error fetching album');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTracklist = async () => {
    try {
      const res = await fetch(`/api/albums/${albumId}/tracklist`);
      if (!res.ok) throw new Error('Error fetching tracklist');
      const data = await res.json();
      setTracklist(data);
    } catch (error) {
      console.error('Error fetching tracklist:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await fetch(`/api/albums/${albumId}/genres`);
      if (!res.ok) throw new Error('Error fetching genres');
      const data = await res.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchDescriptors = async () => {
    try {
      const res = await fetch(`/api/albums/${albumId}/descriptors`);
      if (!res.ok) throw new Error('Error fetching descriptors');
      const data = await res.json();
      setDescriptors(data);
    } catch (error) {
      console.error('Error fetching descriptors:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/albums/${albumId}/reviews`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error fetching reviews');
      }
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (error: any) {
      console.error('Error fetching reviews:', error.message || error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner/>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!album) {
    return <div className="text-white">No album data available.</div>;
  }
  
  const handleReviewSubmit = async () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
  
    if (!user) {
      alert('You must be logged in to submit a review.');
      return;
    }
  
    if (userReview.trim() !== '') {
      try {
        const res = await fetch(`/api/albums/${albumId}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user.username, // Use the username from localStorage
            stars: userRating,
            content: userReview,
            date: new Date().toISOString(),
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          alert(`Error: ${errorData.error}`);
          return;
        }

        setUserRating(0);
        setUserReview('');
        await fetchReviews();
      } catch (error) {
        console.error('Error submitting review:', error);
        alert('An error occurred while submitting your review.');
      }
    } else {
      toast.error('Please write a review before submitting.');
    }
  };
  
  // Calculate total number of reviews
  const totalReviews = reviews.length;

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

const sortedReviews = [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


  return (
    <div className="p-8 text-white">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8">
        {/* Left Column */}
        <div className="space-y-8 bg-gray-900 p-6 rounded-lg">
          {/* Album Cover */}
          <div className="flex justify-center">
          <Image
            src={album.cover}
            alt={`${album.name} Cover`} 
            width={500}
            height={500}
            className="rounded-lg object-cover w-full h-auto" />
          </div>
          {/* Tracklist */}
          <div>
            <h2 className="text-xl font-bold text-gray-200 border-b border-gray-500 pb-3">
              Tracklist
            </h2>
            <ul className="mt-4 divide-y divide-gray-700">
              {tracklist.map((track) => (
                <li key={track.id} className="py-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200 font-medium">
                      {track.trackNumber}. {track.name}
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
              <p className="text-gray-200">{genres.join(', ')}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-bold uppercase text-gray-400">Descriptors</h3>
              <p className="text-gray-200">{descriptors.join(', ')}</p>
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
                        role="button"
                        aria-label={`Rate ${starValue} stars`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleStarClick(e as any, starValue);
                          }
                        }}
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
                disabled={isLoading}
              >
                Submit Review
              </button>
            </div>

            {/* Reviews List */}
            {reviews.length === 0 ? (
              <p className="text-gray-300 mt-6">No reviews yet. Be the first to review!</p>
            ) : (
              sortedReviews.map((review, index) => (
                <div key={index} className="mt-6 border-b border-gray-800 pb-6">
                  <div className="flex items-center">
                    {/* Profile Picture */}
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-200 font-bold">
                      {/* Placeholder initials */}
                      {review.user.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-200 font-semibold">{review.user}</p>
                      <p className="text-gray-300 text-sm">{formatDate(review.date)}</p>
                    </div>
                  </div>
                  {/* Star Rating */}
                  <div className="flex items-center mt-2">
                    {renderStars(review.stars)}
                  </div>
                  {/* Review Content */}
                  <p className="text-gray-200 mt-4 leading-relaxed">{review.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
