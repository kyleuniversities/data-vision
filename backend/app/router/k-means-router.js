const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const testGenerate = require('../util/k-means-test-generator');

// Prepare request parser
router.use(bodyParser.json());

// Prepare CORS functionality
router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Set up test endpoint
router.get('/test', async (req, res) => {
  try {
    return res.send('Test');
  } catch (error) {
    return res.status(500).json({
      error_message: 'Server Error',
    });
  }
});

// Set up test post endpoint
router.post('/test-post', async (req, res) => {
  try {
    return res.send(body);
  } catch (error) {
    return res.status(500).json({
      error_message: 'Server Error',
    });
  }
});

// Set up generate test endpoint
router.post('/generate-test', async (req, res) => {
  const numberOfPoints = parseInt(req.body.numberOfPoints);
  const numberOfCentroids = parseInt(req.body.numberOfCentroids);
  return res.send(testGenerate(numberOfPoints, numberOfCentroids));
});

// Export routes
module.exports = router;
