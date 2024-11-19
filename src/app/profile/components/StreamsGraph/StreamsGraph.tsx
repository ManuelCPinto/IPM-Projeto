'use client';

import React from 'react';
import styles from './StreamsGraph.module.css';

interface StreamsGraphProps {
  data: { date: string; streams: number }[]; // Example: [{ date: "2023-01-01", streams: 5000 }]
}

const StreamsGraph: React.FC<StreamsGraphProps> = ({ data }) => {
  return (
    <div className={styles.graphContainer}>
      <h2 className={styles.title}>Streams Over Time</h2>
      {/* Mock graph - replace with a real graphing library */}
      <div className={styles.graph}>
        {data.map((point, index) => (
          <div
            key={index}
            className={styles.graphBar}
            style={{ height: `${point.streams / 1000}px` }}
          >
            <span className={styles.label}>{point.streams}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamsGraph;
