/**
 * Structure for color
 */
export function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

/**
 * Brightens a color
 */
export function brightenColor(color, level) {
  const r = 255 - (255 - color.r) * (1.0 - level);
  const g = 255 - (255 - color.g) * (1.0 - level);
  const b = 255 - (255 - color.b) * (1.0 - level);
  return new Color(r, g, b);
}

/**
 * Stringifies a color
 */
export function stringifyColor(color) {
  return `rgb(${color.r},${color.g},${color.b})`;
}
