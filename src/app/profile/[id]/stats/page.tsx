'use client';

import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

const GlobeCanvas = dynamic(() => import('./GlobeCanvas'), { ssr: false });
const UserDataGraphs = dynamic(() => import('./UserDataGraphs'), { ssr: false });

export default function StatsPage() {
  const { ref: graphsRef} = useInView({
    threshold: 0.3, // Trigger when 30% of the graphs are visible
  });

  const topCountries = [
    { rank: 1, name: 'USA', listeners: '50,000' },
    { rank: 2, name: 'Brazil', listeners: '30,000' },
    { rank: 3, name: 'India', listeners: '20,000' },
    { rank: 4, name: 'Germany', listeners: '15,000' },
    { rank: 5, name: 'Canada', listeners: '12,000' },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,rgba(30,30,50,0.6),rgba(15,15,30,1),rgba(5,5,15,1))] shadow-lg text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full text-center py-4 bg-gray-800 shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wider uppercase">Statistics</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center w-full max-w-6xl mt-8 space-y-8">
        {/* Globe and Country Cards */}
        <div className="flex w-full space-x-8">
          {/* Left: Globe */}
          <div className="w-1/2 flex justify-center items-center bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="h-full w-full">
              <GlobeCanvas />
            </div>
          </div>

          {/* Right: Top Countries */}
          <div className="w-1/2 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-4 border-b border-gray-700 pb-2">
              Top 5 Countries
            </h2>
            <ul className="space-y-4">
              {topCountries.map((country) => (
                <li
                  key={country.rank}
                  className="flex justify-between items-center bg-gray-700 rounded-lg p-4 shadow-lg hover:bg-gray-600 transition transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-lg">{country.rank}.</span>
                    <span className="text-lg font-medium">{country.name}</span>
                  </div>
                  <span className="text-gray-400">{country.listeners} listeners</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Analytics Overview Section */}
        <div ref={graphsRef} className="relative w-full flex flex-col items-center mt-20">
          <h2 className="text-2xl font-bold text-center tracking-wide mb-4">Analytics Overview</h2>

          {/* Graphs */}
          <div className="flex flex-wrap justify-center items-center w-full space-x-8">
            <div className="w-[45%]">
              <UserDataGraphs chartType="line" />
            </div>
            <div className="w-[45%]">
              <UserDataGraphs chartType="bar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
