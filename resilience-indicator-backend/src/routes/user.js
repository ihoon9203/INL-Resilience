const express = require('express');
const bcrypt = require('bcryptjs');
const { ensureLoggedIn } = require('connect-ensure-login');
const passport = require('../auth/passport');
const sequelize = require('../models/index');

const { User } = sequelize.models;
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
    successReturnToOrRedirect: '/home',
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
 * /api/change_password:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - User
 *     summary: Change user password
 *     requestBody:
 *       description: User new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPasswordChangeInSchema'
 *           examples:
 *             bob:
 *               summary: Bob
 *               value:
 *                 password: newpass
 *     responses:
 *       200:
 *         description: New password saved
 *
 * components:
 *   schemas:
 *     UserPasswordChangeInSchema:
 *       title: UserPasswordChangeInSchema
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           description: The user's new password
 */
router.post(
  '/change_password',
  ensureLoggedIn(),
  async (req, res) => {
    const { password } = req.body;

    const user = await User.findOne({
      where: { email: req.user.email },
    }).catch((err) => req.res.status(500).json(err));

    if (!user) return res.status(404).json({ message: 'User does not exist!' });

    const newHashedPassword = await bcrypt.hash(password, 10);
    user.password = newHashedPassword;

    const savedUser = await user.save();

    if (!savedUser) return res.status(500).json({ error: 'Cannot save new password at the moment!' });
    return res.status(200).json({ message: 'Password change successful!' });
  },
);

/**
 * @openapi
 * /api/change_username:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - User
 *     summary: Change user's username
 *     requestBody:
 *       description: User new username
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUsernameChangeInSchema'
 *           examples:
 *             bob:
 *               summary: Bob
 *               value:
 *                 username: newbob@mail.com
 *     responses:
 *       200:
 *         description: New username saved
 *
 * components:
 *   schemas:
 *     UserUsernameChangeInSchema:
 *       title: UserUsernameChangeInSchema
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           description: The user's new username
 */
router.post(
  '/change_username',
  ensureLoggedIn(),
  async (req, res) => {
    const { username } = req.body;

    const user = await User.findOne({
      where: { email: req.user.email },
    }).catch((err) => req.res.status(500).json(err));

    if (!user) return res.status(404).json({ message: 'User does not exist!' });

    // refresh user session to pull in new email
    req.user.email = username;
    req.login(req.user, () => {});

    user.email = username;
    const savedUser = await user.save();

    if (!savedUser) return res.status(500).json({ error: 'Cannot save new username at the moment!' });
    return res.status(200).json({ message: 'Username change successful!' });
  },
);

module.exports = router;
