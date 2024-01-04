/**
 * Gets the distance between two points
 */
const getDistance = (p1, p2) => {
  return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** 0.5;
};

module.exports = getDistance;
