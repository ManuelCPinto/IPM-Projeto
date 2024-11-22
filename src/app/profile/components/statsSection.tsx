'use client'

import React from 'react'

const StatsSection = ({ artistData }) => (
  <div className="w-full max-w-5xl bg-gray-900 p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold text-white mb-4">Audience Stats</h3>
    <div className="flex justify-between">
      {artistData.streams.map((stream, index) => (
        <div key={index} className="text-center">
          <div className="h-24 bg-blue-600 rounded-md mb-2" style={{ height: `${stream.streams / 1000}px` }}></div>
          <p className="text-gray-400 text-sm">{stream.date}</p>
        </div>
      ))}
    </div>
    <h3 className="text-2xl font-semibold text-white mt-6 mb-4">Top Countries</h3>
    <div className="grid grid-cols-2 gap-4">
      {artistData.countries.map((country, index) => (
        <div key={index} className="bg-blue-600 text-white p-4 rounded-md">
          {country.name}: {country.listeners.toLocaleString()}
        </div>
      ))}
    </div>
  </div>
)

export default StatsSection
