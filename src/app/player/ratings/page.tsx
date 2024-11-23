'use client'

import React, { useEffect, useState } from 'react'
import FeaturedReviews, { FeaturedAlbumReview } from './featuredReviews'
import NewReleases from './newReleases'
import LoadingSpinner from '@/components/loading'
import { Album, Genre, Descriptor, Review } from '@/database/schema'

const RatingsPage: React.FC = () => {
  // State for Featured Reviews
  const [featuredReviews, setFeaturedReviews] = useState<FeaturedAlbumReview[] | null>(null)
  const [featuredReviewsError, setFeaturedReviewsError] = useState<string | null>(null)
  const [featuredReviewsLoading, setFeaturedReviewsLoading] = useState<boolean>(true)

  // State for New Releases
  const [newReleases, setNewReleases] = useState<(Album & { genres: Genre[]; descriptors: Descriptor[] })[] | null>(
    null
  )
  const [newReleasesError, setNewReleasesError] = useState<string | null>(null)
  const [newReleasesLoading, setNewReleasesLoading] = useState<boolean>(true)

  // Loading State
  const isLoading = featuredReviewsLoading || newReleasesLoading

  useEffect(() => {
    const fetchFeaturedReviews = async () => {
      try {
        const featuredAlbumIds = [1, 2]

        const featuredData: FeaturedAlbumReview[] = []

        for (const albumId of featuredAlbumIds) {
          // Fetch album data
          const albumRes = await fetch(`/api/albums/${albumId}`)
          if (!albumRes.ok) {
            throw new Error(`Failed to fetch album data for ID: ${albumId}`)
          }
          const album: Album = await albumRes.json()

          // Fetch genres
          const genresRes = await fetch(`/api/albums/${albumId}/genres`)
          const genres: Genre[] = genresRes.ok ? await genresRes.json() : []

          // Fetch descriptors
          const descriptorsRes = await fetch(`/api/albums/${albumId}/descriptors`)
          const descriptors: Descriptor[] = descriptorsRes.ok ? await descriptorsRes.json() : []

          // Fetch reviews
          const reviewsRes = await fetch(`/api/albums/${albumId}/reviews`)
          const albumReviews: { reviews: Review[] } = reviewsRes.ok ? await reviewsRes.json() : { reviews: [] }

          // Choose the first review as the featured review
          const featuredReview = albumReviews.reviews.length > 0 ? albumReviews.reviews[0] : null

          // Build FeaturedAlbumReview
          featuredData.push({
            album,
            genres,
            descriptors,
            featuredReview
          })
        }

        setFeaturedReviews(featuredData)
      } catch (err) {
        setFeaturedReviewsError(err.message || 'Error Fetching featured reviews')
      } finally {
        setFeaturedReviewsLoading(false)
      }
    }

    const fetchNewReleases = async () => {
      try {
        const newReleaseAlbumIds = [3, 4, 5] // Example album IDs
        const releasesData: (Album & { genres: Genre[]; descriptors: Descriptor[] })[] = []

        for (const albumId of newReleaseAlbumIds) {
          // Fetch album data
          const albumRes = await fetch(`/api/albums/${albumId}`)
          if (!albumRes.ok) {
            throw new Error(`Failed to fetch album data for ID: ${albumId}`)
          }
          const album: Album = await albumRes.json()

          // Fetch genres
          const genresRes = await fetch(`/api/albums/${albumId}/genres`)
          const genres: Genre[] = genresRes.ok ? await genresRes.json() : []

          // Fetch descriptors
          const descriptorsRes = await fetch(`/api/albums/${albumId}/descriptors`)
          const descriptors: Descriptor[] = descriptorsRes.ok ? await descriptorsRes.json() : []

          releasesData.push({
            ...album,
            genres,
            descriptors
          })
        }

        setNewReleases(releasesData)
      } catch (err) {
        setNewReleasesError(err.message || 'Error fetching new releases')
      } finally {
        setNewReleasesLoading(false)
      }
    }

    // Initiate both fetches concurrently
    fetchFeaturedReviews()
    fetchNewReleases()
  }, [])

  return (
    <div className="relative flex flex-col w-full h-full space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-white">Reviews</h1>
      </div>

      {/* Loading Spinner Overlay */}
      {isLoading && <LoadingSpinner message="Loading reviews and releases..." />}

      {/* Main Content */}
      <div className={`grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {/* Featured Reviews */}
        <FeaturedReviews
          featuredReviews={featuredReviews}
          error={featuredReviewsError}
          loading={featuredReviewsLoading}
        />

        {/* New Releases */}
        <NewReleases Albums={newReleases} error={newReleasesError} loading={newReleasesLoading} />
      </div>
    </div>
  )
}

export default RatingsPage
