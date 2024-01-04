import { useEffect, useRef } from 'react';

// Canvas object
export const Canvas = (props) => {
  // Set up the properties
  const { draw, ...otherProperties } = props;

  // Set up the reference
  const canvasReference = useRef(null);

  // Set up to draw continuously
  useEffect(() => {
    // Set up canvas data
    const canvas = canvasReference.current;
    const context = canvas.getContext('2d');

    // Set up frame data
    let time = 0;
    let frameId;

    // Set up function to draw the image
    const renderImage = () => {
      time++;
      draw(context, time);
      frameId = window.requestAnimationFrame(renderImage);
    };

    // Draw the image
    renderImage();

    // Returns the cleanup function
    // The cleanup function is to cleanup effects from previous renders
    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [draw]);

  // Return component
  return <canvas ref={canvasReference} {...otherProperties} />;
};

// Canvas object
/*
export const Canvas = (props) => {
  

  // Return component
  return <canvas ref={canvasReference} {...props} />;
}; */
