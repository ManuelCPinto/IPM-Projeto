'use client';

import React from 'react';
import styles from './AudienceMap.module.css';

interface AudienceMapProps {
  countries: { name: string; listeners: number }[]; // Example: [{ name: "USA", listeners: 50000 }]
}

const AudienceMap: React.FC<AudienceMapProps> = ({ countries }) => {
  return (
    <div className={styles.mapContainer}>
      <h2 className={styles.title}>Audience Distribution</h2>
      <div className={styles.map}>
        {/* Mock implementation: replace with a real map library */}
        {countries.map((country, index) => (
          <div key={index} className={styles.country} style={{ fontSize: `${country.listeners / 1000}px` }}>
            {country.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudienceMap;
