const Point = require('./point');

/**
 * Gets the average of a list of points
 */
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

module.exports = getAverage;
