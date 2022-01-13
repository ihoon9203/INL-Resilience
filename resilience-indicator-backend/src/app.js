const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes/v1');
const pjson = require('../package.json');

// Set up express app
const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(cors());
app.use(express.json());

// Log requests to the console
app.use(logger('dev'));

// Setup OpenAPI Swagger docs
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Resilience Indicator API',
    version: pjson.version,
  },
  basePath: '/api',
};
const options = {
  swaggerDefinition,
  apis: ['src/routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Require our routes into the application
app.use('/api', routes);

// Pass all other requests to our client-side app
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

module.exports = app;
