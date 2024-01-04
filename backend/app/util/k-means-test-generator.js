const nextInt = require('../../common/util/random');
const shuffle = require('../../common/util/array');

// Set key constants
const MIN = 5;
const MAX = 95;
const NUMBER_OF_CLUSTER_ITERATIONS = 10;

// Class for a point
function Point(x, y) {
  this.x = x;
  this.y = y;
}

/*******************************
 * PRIVATE HELPER METHODS
 ******************************/
const getDistance = (p1, p2) => {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** 0.5;
};

const getAverage = (points) => {
  let n = points.length;
  let x = 0;
  let y = 0;
  for (let i = 0; i < n; i++) {
    x += points[i].x;
    y += points[i].y;
  }
  return new Point(x / n, y / n);
};

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
 * Appends drawing commands from clusters
 */
const appendClusterDrawingCommands = (commands, clusters) => {
  for (let i = 0; i < clusters.length; i++) {
    commands.push({ ...clusters[i], type: 'cluster' });
  }
};

/**
 * Generates a list of clusters
 */
const generateClusters = (points, numberOfCentroids) => {
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

/**
 * Appends drawing commands from points
 */
const appendPointDrawingCommands = (commands, points) => {
  for (let i = 0; i < points.length; i++) {
    commands.push({ ...points[i], type: 'point' });
  }
};

/*******************************
 * MAIN MODULE METHOD
 ******************************/
/**
 * Function to generate points and
 */
const testGenerate = (numberOfPoints, numberOfCentroids) => {
  // Set up drawing command list to be returned
  const commands = [];

  // Generate random points
  const points = generatePoints(numberOfPoints);

  // Generate clusters
  const clusters = generateClusters(points, numberOfCentroids);

  // Append commands to clusters
  appendClusterDrawingCommands(commands, clusters);

  // Append commands to draw points
  appendPointDrawingCommands(commands, points);

  // Return drawing command list
  return commands;
};

module.exports = testGenerate;
