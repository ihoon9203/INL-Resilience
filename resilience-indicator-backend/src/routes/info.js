const express = require('express');
const pjson = require('../../package.json');

const router = express.Router();

/**
 * @openapi
 * /api:
 *   get:
 *     tags:
 *     - Info
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Returns a welcome message.
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Resilience Indicator API!',
  });
});

/**
 * @openapi
 * /api/version:
 *   get:
 *     tags:
 *     - Info
 *     summary: Get the API version
 *     responses:
 *       200:
 *         description: Returns the API version.
 */
router.get('/version', (req, res) => {
  res.json({
    version: pjson.version,
  });
});

module.exports = router;
