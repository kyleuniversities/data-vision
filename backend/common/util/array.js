const nextInt = require('./random');

/**
 * Swaps two elements in an array
 */
const swap = (array, i, j) => {
  const tmp = array[j];
  array[j] = array[i];
  array[i] = tmp;
};

/**
 * Shuffles an array
 */
const shuffle = (array) => {
  const length = array.length;
  const start = nextInt(0, length);
  for (let h = 0; h < length; h++) {
    const i = (start + h) % length;
    const j = nextInt(0, length);
    swap(array, i, j);
  }
};

module.exports = shuffle;
