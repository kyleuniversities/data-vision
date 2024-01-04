const nextInt = require('../../common/util/random');
const shuffle = require('../../common/util/array');
const getDistance = require('../../common/util/distance');
const getAverage = require('../../common/util/average');

// Set key constants
const NUMBER_OF_CLUSTER_ITERATIONS = 10;

/*******************************
 * MINOR METHODS
 ******************************/
/**
 * Appends clusters with radius to the farthest point
 */
const compileClusterRadii = (clusters) => {
  for (let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i];
    const centroid = cluster.centroid;
    const points = cluster.pointList;
    let furthestDistance = 0;
    for (let j = 0; j < points.length; j++) {
      const distance = getDistance(centroid, points[j]);
      if (distance > furthestDistance) {
        furthestDistance = distance;
      }
    }
    cluster.radius = furthestDistance;
  }
};

/**
 * Updates centroid with point list averages
 */
const updateCentroidsWithAverageAssociatedPoints = (centroids, clusters) => {
  for (let i = 0; i < clusters.length; i++) {
    centroids[i] = getAverage(clusters[i].pointList);
  }
};

/**
 * Associates a point with the closest cluster
 */
const associatePointWithClosestCluster = (point, clusters) => {
  let closestIndex = -1;
  let closestDistance = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < clusters.length; i++) {
    const centroid = clusters[i].centroid;
    const distance = getDistance(point, centroid);
    if (distance < closestDistance) {
      closestIndex = i;
      closestDistance = distance;
    }
  }
  clusters[closestIndex].pointList.push(point);
};

/**
 * Generates a random list of centroids
 */
const generateRandomCentroidList = (numberOfCentroids, points) => {
  const clone = [...points];
  shuffle(clone);
  return clone.slice(0, numberOfCentroids);
};

/*******************************
 * MAJOR METHODS
 ******************************/
/**
 * Detects a list of clusters
 */
const detectClusters = (points, numberOfCentroids) => {
  let clusters = [];
  const centroids = generateRandomCentroidList(numberOfCentroids, points);
  for (let i = 0; i < NUMBER_OF_CLUSTER_ITERATIONS; i++) {
    clusters = centroids.map((centroid) => ({ centroid, pointList: [] }));
    for (let j = 0; j < points.length; j++) {
      const point = points[j];
      associatePointWithClosestCluster(point, clusters);
    }
    updateCentroidsWithAverageAssociatedPoints(centroids, clusters);
  }
  compileClusterRadii(clusters);
  return clusters;
};

/**
 * Gets the points from clusters
 */
const getPoints = (clusters) => {
  const points = [];
  for (let i = 0; i < clusters.length; i++) {
    const pointList = clusters[i].pointList;
    for (let j = 0; j < pointList.length; j++) {
      points.push(pointList[j]);
    }
  }
  return points;
};

/*******************************
 * MAIN MODULE METHOD
 ******************************/
/**
 * Function to detect clusters
 */
const detect = (clusters, numberOfCentroids) => {
  // Generate random points
  const points = getPoints(clusters);

  // Detect clusters
  const detectedClusters = detectClusters(points, numberOfCentroids);

  // Return detected clusters
  return detectedClusters;
};

module.exports = detect;
