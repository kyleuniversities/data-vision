const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const testGenerate = require('../util/k-means-test-generator');
const generate = require('../util/k-means-generator');
const getCommands = require('../util/k-means-commands');
const detect = require('../util/k-means-detector');

// Prepare request parser
router.use(bodyParser.json());

// Prepare CORS functionality
router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Set up generate test endpoint
router.get('/generate', async (req, res) => {
  const numberOfPoints = parseInt(req.query.numberOfPoints);
  const numberOfGeneratingCentroids = parseInt(
    req.query.numberOfGeneratingCentroids
  );
  return res.send(generate(numberOfPoints, numberOfGeneratingCentroids));
});

// Set up get commands from clusters endpoint
router.post('/commands', async (req, res) => {
  return res.send(getCommands(req.body.clusters));
});

// Set up detect clusters endpoint
router.post('/detect', async (req, res) => {
  const clusters = req.body.clusters;
  const numberOfDetectingCentroids = parseInt(
    req.body.numberOfDetectingCentroids
  );
  return res.send(detect(clusters, numberOfDetectingCentroids));
});

// Set up generate test endpoint
router.post('/generate-test', async (req, res) => {
  const numberOfPoints = parseInt(req.body.numberOfPoints);
  const numberOfCentroids = parseInt(req.body.numberOfCentroids);
  return res.send(testGenerate(numberOfPoints, numberOfCentroids));
});

// Export routes
module.exports = router;
