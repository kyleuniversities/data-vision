/**
 * Chooses a random integer within a range
 * Remember: Math.random() returns a random number between 0 and 1
 */
const nextInt = (start, upTo) => {
  const length = upTo - start;
  return start + Math.floor(Math.random() * length);
};

module.exports = nextInt;
