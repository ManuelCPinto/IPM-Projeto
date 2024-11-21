'use client';

import React, { useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';

interface CountryData {
  iso3: string;
  value: number;
  label: string;
  lat: number;
  lng: number;
}

const GlobeCanvas: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);

  // Data for highlighted countries
  const countriesData: CountryData[] = [
    { iso3: 'USA', value: 50000, label: 'USA', lat: 37.7749, lng: -95.7129 },
    { iso3: 'BRA', value: 30000, label: 'Brazil', lat: -14.235, lng: -51.9253 },
    { iso3: 'IND', value: 20000, label: 'India', lat: 20.5937, lng: 78.9629 },
    { iso3: 'GBR', value: 15000, label: 'UK', lat: 55.3781, lng: -3.436 },
    { iso3: 'CAN', value: 12000, label: 'Canada', lat: 56.1304, lng: -106.3468 },
  ];

  // Rotate the globe
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Globe
        ref={globeRef}
        width={500}
        height={500}
        globeImageUrl="/world.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={countriesData}
        pointAltitude={(d: CountryData) => d.value / 150000} // Reduced height (1/3 of original)
        pointRadius={0.5} // Base radius of the points
        pointColor={() => 'rgba(56, 94, 144, 0.9)'} // Dark blue
        labelsData={countriesData}
        labelText={(d: CountryData) => `${d.label} (${d.value.toLocaleString()} listeners)`}
        labelColor={() => '#93c5fd'} // Light blue labels for better contrast
        labelSize={2.0} // Increased label size for better visibility
        labelDotRadius={0.5}
      />
    </div>
  );
};

export default GlobeCanvas;
