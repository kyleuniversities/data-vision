import { useState } from 'react';
import { Canvas } from './Canvas';
import './index.css';

/**
 * Container for viewing cluster graphs
 */
export const ClusterContainer = () => {
  // Sample animation
  const draw = (context, time) => {
    const omega = 0.02;
    const x = 200 + 100 * Math.cos(time * omega);
    const y = 200 + 100 * Math.sin(time * omega);
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 400, 400);
    context.fillStyle = '#000000';
    context.beginPath();
    context.strokeStyle = '#0000bb';
    context.moveTo(200, 200);
    context.lineWidth = 5;
    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.arc(200, 200, 20, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
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
