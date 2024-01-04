import { useState } from 'react';
import { Canvas } from './Canvas';
import './index.css';
import { drawGraph } from '../helper/GraphHelper';

/**
 * Container for viewing cluster graphs
 */
export const ClusterContainer = () => {
  // Sample animation
  const draw = (context, time) => {
    drawGraph(context);
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
