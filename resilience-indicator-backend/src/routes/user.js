const express = require('express');
const bcrypt = require('bcryptjs');
const { ensureLoggedIn } = require('connect-ensure-login');
const passport = require('../auth/passport');
const sequelize = require('../models/index');

const { User, Score, Survey } = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api/register:
 *   post:
 *     tags:
 *     - User
 *     summary: Register new user
 *     requestBody:
 *       description: User email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInSchema'
 *           examples:
 *             bob:
 *               summary: Bob
 *               value:
 *                 username: bob@mail.com
 *                 password: pass
 *             josie:
 *               summary: Josie
 *               value:
 *                 username: josie@mail.com
 *                 password: pass
 *     responses:
 *       201:
 *         description: New user registered
 *
 * components:
 *   schemas:
 *     UserInSchema:
 *       title: UserInSchema
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's password
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const alreadyExistsUser = await User.findOne({
    where: { email: username },
  }).catch((err) => {
    console.log('Error: ', err);
  });

  if (alreadyExistsUser) {
    return res.status(409).json({ message: 'User with email already exists! ' });
  }

  const isAdmin = 0; // TODO: make configurable
  const timesVisited = 1;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email: username, password: hashedPassword, isAdmin, timesVisited,
  });
  const savedUser = await newUser.save().catch((err) => {
    console.log('Error: ', err);
    res.status(500).json({ error: 'Cannot register user at the moment!' });
  });

  if (!savedUser) return res.status(500).json({ error: 'Cannot register user at the moment!' });
  return res.status(201).json({ message: 'Thanks for registering!' });
});

/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *     - User
 *     summary: Login user
 *     requestBody:
 *       description: User username and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInSchema'
 *           examples:
 *             bob:
 *               summary: Bob
 *               value:
 *                 username: bob@mail.com
 *                 password: pass
 *             josie:
 *               summary: Josie
 *               value:
 *                 username: josie@mail.com
 *                 password: pass
 *     responses:
 *       200:
 *         description: OK
 */
router.post(
  '/login',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
  (req, res) => {
    res.status(200).json({ message: 'Welcome Back!' });
  },
);

/**
 * @openapi
 * /api/logout:
 *   post:
 *     tags:
 *     - User
 *     summary: Logout user
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

/**
 * @openapi
 * /api/logged_in:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - User
 *     summary: Check if user is logged in
 *     responses:
 *       200:
 *         description: Returns true with user info if logged in.
 *
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: session
 */
router.get(
  '/logged_in',
  async (req, res) => {
    let loggedIn = true;
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      loggedIn = false;
    }
    return res.status(200).json({ loggedIn, user: req.user });
  },
);

/**
 * @openapi
 * /api/score/{survey}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - User
 *     summary: Get user score for specified survey
 *     parameters:
 *     - name: survey
 *       description: short-name for survey
 *       in: path
 *       required: true
 *       type: string
 *       enum: [health, cyber, finance, emergency]
 *     responses:
 *       200:
 *         description: Returns user score of survey.
 */
router.get(
  '/score/:survey',
  ensureLoggedIn(),
  async (req, res) => {
    const results = await Score.findOne({
      include: [{ model: User, attributes: { exclude: ['password'] } }, { model: Survey }],
      where: { userId: req.user.id, '$Survey.category$': req.params.survey },
    }).catch((err) => {
      console.log('DB_ERROR: ', err);
      return res.status(500).send('INTERNAL_ERROR: ', err);
    });

    if (!results) return res.status(404).send(`Survey Score for "${req.params.survey}" Not Found`);
    return res.status(200).json(results);
  },
);

module.exports = router;
