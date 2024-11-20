'use client';

import React, { useRef } from 'react';
import Globe from 'react-globe.gl';

const markers = [
    { lat: 37.7749, lng: -122.4194, label: 'San Francisco' },
    { lat: -22.9068, lng: -43.1729, label: 'Rio de Janeiro' },
    { lat: 28.6139, lng: 77.209, label: 'Delhi' },
    { lat: 51.5074, lng: -0.1278, label: 'London' },
    { lat: 40.7128, lng: -74.006, label: 'New York' },
  ];
  
  const GlobeCanvas = () => {
    const globeRef = useRef(null);
  
    return (
      <div style={{ height: '100%', width: '100%' }}>
        {markers && markers.length > 0 ? (
          <Globe
            ref={globeRef}
            globeImageUrl="/world.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            labelsData={markers}
            labelSize={1.5}
            labelDotRadius={0.6}
            labelColor={() => 'yellow'}
          />
        ) : (
          <p>No markers available</p>
        )}
      </div>
    );
  };
  
export default GlobeCanvas;
