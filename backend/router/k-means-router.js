const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

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
    const body = req.body;
    body['status'] = 'Success!';
    return res.send(body);
  } catch (error) {
    return res.status(500).json({
      error_message: 'Server Error',
    });
  }
});

// Export routes
module.exports = router;
