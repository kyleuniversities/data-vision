const nextInt = require('../../common/util/random');
const getDistance = require('../../common/util/distance');
const Point = require('../../common/util/point');

// Set key constants
const MIN = 15;
const MAX = 85;

/*******************************
 * MINOR METHODS
 ******************************/

/**
 * Append random points
 */
const appendPoints = (clusters, numberOfPoints) => {
  while (numberOfPoints > 0) {
    for (let i = 0; i < clusters.length && numberOfPoints > 0; i++) {
      const cluster = clusters[i];
      const centroid = cluster.centroid;
      const r = Math.random() * cluster.radius;
      const theta = Math.random() * 2 * Math.PI;
      const x = centroid.x + r * Math.cos(theta);
      const y = centroid.y + r * Math.sin(theta);
      clusters[i].pointList.push(new Point(x, y));
      numberOfPoints--;
    }
  }
};

/**
 * Append radii to clusters
 */
const appendRadii = (clusters) => {
  for (let i = 0; i < clusters.length; i++) {
    // Set up subject centroids
    const cluster1 = clusters[i];
    const centroid1 = cluster1.centroid;

    // Collect the min distance from other centroids
    let minDistance = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j < clusters.length; j++) {
      if (i != j) {
        const centroid2 = clusters[j].centroid;
        const distance = getDistance(centroid1, centroid2);
        if (distance < minDistance) {
          minDistance = distance;
        }
      }
    }

    // The cluster radius will be less than half of the min distance
    cluster1.radius = Math.max(Math.floor(minDistance / 2 - 1), 1);
  }
};

/*******************************
 * MAJOR METHODS
 ******************************/

/**
 * Generates a list of clusters
 */
const generateClusters = (centroids, numberOfPoints) => {
  // Initialize clusters
  const clusters = centroids.map((centroid) => ({ centroid, pointList: [] }));

  // Append radii
  appendRadii(clusters);

  // Append random points
  appendPoints(clusters, numberOfPoints);

  // Return clusters
  return clusters;
};

/**
 * Generates a list of points
 */
const generatePoints = (numberOfPoints) => {
  const points = [];
  for (let i = 0; i < numberOfPoints; i++) {
    const x = nextInt(MIN, MAX);
    const y = nextInt(MIN, MAX);
    points.push(new Point(x, y));
  }
  return points;
};

/*******************************
 * MAIN MODULE METHOD
 ******************************/
/**
 * Function to generate points
 */
const generate = (numberOfPoints, numberOfGeneratingCentroids) => {
  // Generate random centroid points
  const centroids = generatePoints(numberOfGeneratingCentroids);

  // Generate clusters
  const clusters = generateClusters(centroids, numberOfPoints);

  // Return clusters
  return clusters;
};

module.exports = generate;
