/**
 * Fills a circle on a context
 */
export const fillCircle = (context, x, y, r) => {
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.fill();
};

/**
 * Fills a rectangle on a context
 */
export const fillRect = (context, x, y, w, h) => {
  context.fillRect(x, y, w, h);
};

/**
 * Sets the fill style of a context
 */
export const fillStyle = (context, style) => {
  context.fillStyle = style;
};

/**
 * Sets the line width of a context
 */
export const lineWidth = (context, width) => {
  context.lineWidth = width;
};
/**
 * Strokes a line on a context
 */
export const strokeLine = (context, x1, y1, x2, y2) => {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

/**
 * Strokes a line on a context
 */
export const strokeLineWithPoints = (context, p1, p2) => {
  strokeLine(context, p1.x, p1.y, p2.x, p2.y);
};

/**
 * Sets the stroke style of a context
 */
export const strokeStyle = (context, style) => {
  context.strokeStyle = style;
};
