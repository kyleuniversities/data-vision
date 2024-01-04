import { useState } from 'react';
import { Canvas } from './Canvas';
import './index.css';

/**
 * Container for viewing cluster graphs
 */
export const ClusterContainer = () => {
  // Sample animation
  const draw = (context, time) => {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 400, 400);
    context.fillStyle = '#000000';
    context.beginPath();
    const omega = 0.02;
    const x = 200 + 100 * Math.cos(time * omega);
    const y = 200 + 100 * Math.sin(time * omega);
    context.arc(x, y, 20, 0, 2 * Math.PI);
    context.fill();
  };

  return (
    <div className="clusterContainer">
      <h1>Cluster Graph</h1>
      <div className="clusterGraphContainer">
        <Canvas width={400} height={400} draw={draw} />
      </div>
      <h2>Generate:</h2>
    </div>
  );
};
