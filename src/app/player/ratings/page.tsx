'use client'
import React from 'react'
import FeaturedReviews from './featuredReviews'
import NewReleases from './newReleases'

const RatingsPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-white">Ratings</h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <FeaturedReviews />
        <NewReleases />
        <br/>
      </div>
    </div>
  )
}

export default RatingsPage
