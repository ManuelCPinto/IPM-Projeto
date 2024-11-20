'use client';

import React, { useEffect, useState } from 'react';
import FeaturedReviews, { FeaturedAlbumReview } from './featuredReviews';
import NewReleases from './newReleases';
import LoadingSpinner from '@/components/loading';
import { Album, Genre, Descriptor, Review } from '@/database/schema';

const RatingsPage: React.FC = () => {
  // State for Featured Reviews
  const [featuredReviews, setFeaturedReviews] = useState<FeaturedAlbumReview[] | null>(null);
  const [featuredReviewsError, setFeaturedReviewsError] = useState<string | null>(null);
  const [featuredReviewsLoading, setFeaturedReviewsLoading] = useState<boolean>(true);

  // State for New Releases
  const [newReleases, setNewReleases] = useState<(Album & { genres: Genre[]; descriptors: Descriptor[] })[] | null>(null);
  const [newReleasesError, setNewReleasesError] = useState<string | null>(null);
  const [newReleasesLoading, setNewReleasesLoading] = useState<boolean>(true);

  // Loading State
  const isLoading = featuredReviewsLoading || newReleasesLoading;

  useEffect(() => {
    // Fetch FeaturedReviews
    const fetchFeaturedReviews = async () => {
      try {
        const featuredAlbumIds = ['utopia', 'cure'];
        const featuredData: FeaturedAlbumReview[] = [];

        const fetchPromises = featuredAlbumIds.map(async (albumId) => {
          // Fetch Album Data
          const albumRes = await fetch(`/api/albums/${albumId}`);
          if (!albumRes.ok) {
            const errorData = await albumRes.json();
            throw new Error(errorData.error || `Error fetching album with ID: ${albumId}`);
          }
          const album: Album = await albumRes.json();

          // Fetch Genres
          const genresRes = await fetch(`/api/albums/${albumId}/genres`);
          let genres: Genre[] = [];
          if (genresRes.ok) {
            genres = await genresRes.json();
          } else {
            console.error(`Error fetching genres for album ID: ${albumId}`);
          }

          // Fetch Descriptors
          const descriptorsRes = await fetch(`/api/albums/${albumId}/descriptors`);
          let descriptors: Descriptor[] = [];
          if (descriptorsRes.ok) {
            descriptors = await descriptorsRes.json();
          } else {
            console.error(`Error fetching descriptors for album ID: ${albumId}`);
          }

          // Fetch Reviews
          const reviewsRes = await fetch(`/api/albums/${albumId}/reviews`);
          let reviews: Review[] = [];
          if (reviewsRes.ok) {
            reviews = await reviewsRes.json();
          } else {
            console.error(`Error fetching reviews for album ID: ${albumId}`);
          }

          // Choose the first review to be featured
          const featuredReview = reviews.length > 0 ? reviews[0] : null;

          featuredData.push({
            album,
            genres,
            descriptors,
            featuredReview,
          });
        });

        await Promise.all(fetchPromises);
        setFeaturedReviews(featuredData);
      } catch (err: any) {
        console.error('Error fetching featured reviews:', err.message || err);
        setFeaturedReviewsError(err.message || 'Error fetching featured reviews');
      } finally {
        setFeaturedReviewsLoading(false);
      }
    };

    // Fetch New Releases
    const fetchNewReleases = async () => {
      try {
        const newReleaseAlbumIds = ['tyler', 'mount-eerie', 'cool-world'];
        const releasesData: (Album & { genres: Genre[]; descriptors: Descriptor[] })[] = [];

        const fetchPromises = newReleaseAlbumIds.map(async (albumId) => {
          // Fetch Album Data
          const albumRes = await fetch(`/api/albums/${albumId}`);
          if (!albumRes.ok) {
            const errorData = await albumRes.json();
            throw new Error(errorData.error || `Error fetching album with ID: ${albumId}`);
          }
          const album: Album = await albumRes.json();

          // Fetch Genres
          const genresRes = await fetch(`/api/albums/${albumId}/genres`);
          let genres: Genre[] = [];
          if (genresRes.ok) {
            genres = await genresRes.json();
          } else {
            console.error(`Error fetching genres for album ID: ${albumId}`);
          }
          
          // Fetch Descriptors
          const descriptorsRes = await fetch(`/api/albums/${albumId}/descriptors`);
          let descriptors: Descriptor[] = [];
          if (descriptorsRes.ok) {
            descriptors = await descriptorsRes.json();
          } else {
            console.error(`Error fetching descriptors for album ID: ${albumId}`);
          }

          releasesData.push({
            ...album,
            genres,
            descriptors,
          });
        });

        await Promise.all(fetchPromises);
        setNewReleases(releasesData);
      } catch (err: any) {
        console.error('Error fetching new releases:', err.message || err);
        setNewReleasesError(err.message || 'Error fetching new releases');
      } finally {
        setNewReleasesLoading(false);
      }
    };

    // Initiate both fetches concurrently
    fetchFeaturedReviews();
    fetchNewReleases();
  }, []);

  return (
    <div className="relative flex flex-col w-full h-full space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-white">Reviews</h1>
      </div>

      {/* Loading Spinner Overlay */}
      {isLoading && (
        <LoadingSpinner message="Loading reviews and releases..." />
      )}

      {/* Main Content */}
      <div className={`grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {/* Featured Reviews */}
        <FeaturedReviews
          featuredReviews={featuredReviews}
          error={featuredReviewsError}
          loading={featuredReviewsLoading}
        />

        {/* New Releases */}
        <NewReleases
          Albums={newReleases}
          error={newReleasesError}
          loading={newReleasesLoading}
        />
      </div>
    </div>
  );
};

export default RatingsPage;
