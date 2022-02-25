const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const sessionStore = require('./auth/sessionStore');
const routes = require('./routes');
const pjson = require('../package.json');
const passport = require('./auth/passport');
const ensureAdmin = require('./auth/ensureAdmin');

// Set up express app
const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  name: 'session',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  secret: 'awesomesecret', // TODO: fix me
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2, // two hours
    sameSite: true,
    secure: false, // enable this with HTTPS
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use(flash());

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
  apis: ['src/routes/*.js', 'src/routes/admin/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Require our routes into the application
app.all('/api/admin/*', ensureAdmin());
app.use('/api', routes);

// Pass all other requests to our client-side app
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

module.exports = app;
