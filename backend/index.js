const express = require('express');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Set up express
const app = express();

// Set up express middleware
app.use(jsonParser);
app.use(express.json());
app.use(cors());
app.use('/', router);

// Set up port data
port = 5000;

// Set up test endpoint
router.get('/hello', function (req, res) {
  return res.send(`Hello World!`);
});

// Mount routes
app.use('/k-means', require('./router/k-means-router'));

// Launch app
app.listen(port, () => {
  console.log(`Example app listening at ${port}.`);
});

// Export app
module.exports = app;
