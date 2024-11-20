'use client';

import dynamic from 'next/dynamic';

const GlobeCanvas = dynamic(() => import('./GlobeCanvas'), { ssr: false });

export default function StatsPage() {
  const topCountries = [
    { rank: 1, name: 'USA', listeners: '50,000' },
    { rank: 2, name: 'Brazil', listeners: '30,000' },
    { rank: 3, name: 'India', listeners: '20,000' },
    { rank: 4, name: 'Germany', listeners: '15,000' },
    { rank: 5, name: 'Canada', listeners: '12,000' },
  ];

  return (
    <div className="h-screen bg-neutral-900 text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full text-center py-4 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold tracking-wider">Statistics</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 w-full max-w-6xl mt-8 space-x-6">
        {/* Left: Globe */}
        <div className="w-2/3 flex justify-center items-center">
          <div className="h-96 w-96">
            <GlobeCanvas />
          </div>
        </div>

        {/* Right: Top Countries Card */}
        <div className="w-1/3 bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-center mb-4">Top 5 Countries</h2>
          <ul className="space-y-3">
            {topCountries.map((country) => (
              <li
                key={country.rank}
                className="flex justify-between items-center bg-gray-700 rounded-md p-3 shadow-md hover:bg-gray-600 transition"
              >
                <span className="font-medium">{country.rank}. {country.name}</span>
                <span className="text-gray-400">{country.listeners} listeners</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
