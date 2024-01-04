// Switch for when debugging is on
const DEBUGGING_IS_ON = false;

/**
 * Alert when debugging is on
 */
export function debugAlert(message) {
  if (DEBUGGING_IS_ON) {
    alert(message);
  }
}
