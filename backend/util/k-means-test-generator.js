const nextInt = require('./random');

// Set bounds
const MIN = 5;
const MAX = 95;

// Class for a point
function Point(x, y) {
  this.x = x;
  this.y = y;
}

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

/**
 * Function to generate points and
 */
const testGenerate = (numberOfPoints, numberOfCentroids) => {
  // Set up drawing command list to be returned
  const commands = [];

  // Generate random points
  const points = generatePoints(numberOfPoints);

  // Append commands to draw points
  appendPointDrawingCommands(commands, points);

  // Return drawing command list
  return commands;
};

module.exports = testGenerate;
