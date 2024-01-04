import {
  fillCircle,
  fillRect,
  fillStyle,
  lineWidth,
  strokeLine,
  strokeStyle,
} from './DrawHelper';

// Set up key constants
const WIDTH = 400;
const BORDER_WIDTH = 4;
const PADDING_WIDTH = 24;
const AXES_WIDTH = 3;
const MARKERS_WIDTH = 2;
const POINT_RADIUS = 6;
const INNER_LENGTH = WIDTH - 2 * BORDER_WIDTH - PADDING_WIDTH * 2;
const NUMBER_OF_MARKERS_PER_AXIS = 4;
const MARK_LENGTH = INNER_LENGTH / (NUMBER_OF_MARKERS_PER_AXIS + 1);

// Set up top coordinates
const ORIGIN_X = BORDER_WIDTH + PADDING_WIDTH;
const ORIGIN_Y = WIDTH - BORDER_WIDTH - PADDING_WIDTH;
const MAX_X = WIDTH - BORDER_WIDTH - PADDING_WIDTH;
const MAX_Y = BORDER_WIDTH + PADDING_WIDTH;

// Set up directions
const DIR_X = 1;
const DIR_Y = -1;

/**
 * Function for drawing the graph background
 */
export const drawGraphBackground = (context) => {
  drawBorderedFrame(context);
  drawMarkers(context);
  drawAxes(context);
};

/**
 * Function for drawing a point
 */
export const drawPoint = (context, command) => {
  fillStyle(context, 'black');
  fillCircle(context, graphX(command.x), graphY(command.y), 4);
};

// Converts x to an x in the graph
const graphX = (x) => ORIGIN_X + (x / 100.0) * INNER_LENGTH * DIR_X;

// Converts y to an x in the graph
const graphY = (y) => ORIGIN_Y + (y / 100.0) * INNER_LENGTH * DIR_Y;

// Draws the markers
const drawMarkers = (context) => {
  const level = 128;
  strokeStyle(context, `rgb(${level},${level},${level})`);
  lineWidth(context, MARKERS_WIDTH);
  for (let i = 0; i < NUMBER_OF_MARKERS_PER_AXIS; i++) {
    const x = ORIGIN_X + (i + 1) * MARK_LENGTH * DIR_X;
    strokeLine(context, x, ORIGIN_Y - 2, x, MAX_Y);
  }
  for (let i = 0; i < NUMBER_OF_MARKERS_PER_AXIS; i++) {
    const y = ORIGIN_Y + (i + 1) * MARK_LENGTH * DIR_Y;
    strokeLine(context, ORIGIN_X, y, MAX_X, y);
  }
};

// Draws the axes
const drawAxes = (context) => {
  strokeStyle(context, 'black');
  lineWidth(context, AXES_WIDTH);
  strokeLine(context, ORIGIN_X, ORIGIN_Y - 2, MAX_X, ORIGIN_Y);
  strokeLine(context, ORIGIN_X, ORIGIN_Y, ORIGIN_X, MAX_Y);
};

// Draws the bordered frame
const drawBorderedFrame = (context) => {
  fillStyle(context, 'black');
  fillRect(context, 0, 0, WIDTH, WIDTH);
  fillStyle(context, 'white');
  fillRect(
    context,
    BORDER_WIDTH,
    BORDER_WIDTH,
    WIDTH - 2 * BORDER_WIDTH,
    WIDTH - 2 * BORDER_WIDTH
  );
};
