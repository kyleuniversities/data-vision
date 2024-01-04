const nextInt = require('../../common/util/random');
const shuffle = require('../../common/util/array');

// Set key constants
const MIN = 5;
const MAX = 95;
const NUMBER_OF_CLUSTER_ITERATIONS = 10;

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
 * Function to get commands
 */
const getCommands = (clusters) => {
  // Set up drawing command list to be returned
  const commands = [];

  // Generate random points
  const points = getPoints(clusters);

  // Append commands to clusters
  appendClusterDrawingCommands(commands, clusters);

  // Append commands to draw points
  appendPointDrawingCommands(commands, points);

  // Return drawing command list
  return commands;
};

module.exports = getCommands;
