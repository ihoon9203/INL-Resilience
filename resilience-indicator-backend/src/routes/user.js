const express = require('express');
const bcrypt = require('bcryptjs');
const { ensureLoggedIn } = require('connect-ensure-login');
const crypto = require('crypto');
const sendGridEmail = require('@sendgrid/mail');
const { Sequelize } = require('sequelize');
const passport = require('../auth/passport');
const sequelize = require('../models/index');

const { Op } = Sequelize;

const { User, NotificationSetting } = sequelize.models;
const router = express.Router();

const fromEmail = process.env.SENDGRID_FROM_EMAIL;
sendGridEmail.setApiKey(process.env.SENDGRID_API_KEY);

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

  // Create default notification settings
  const settings = [
    'General',
    'Financial',
    'Cyber',
    'Health',
    'Emergency',
  ];
  settings.forEach(async (s) => {
    const newNotificationSetting = new NotificationSetting({
      setting: s,
      enabled: true,
      userId: savedUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedNotificationSetting = await newNotificationSetting.save().catch((err) => {
      console.log('Error: ', err);
      res.status(500).json({ error: 'Cannot save new notification setting at the moment!' });
    });
    if (!savedNotificationSetting) res.status(500).json({ error: 'Cannot save new notification setting at the moment!' });
  });

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
 * /api/verify-email:
 *   get:
 *     tags:
 *     - User
 *     summary: Send link to verify email
 *     responses:
 *       200:
 *         description: Reset link generated and sent to user's email
 */
router.get(
  '/verify-email',
  async (req, res) => {
    const userEmail = req.user.email;

    const user = await User.findOne({
      where: { email: userEmail },
    }).catch((err) => req.res.status(500).json(err));

    if (!user) return res.status(404).json({ message: 'User does not exist!' });

    // generate email token
    user.emailVerifyToken = crypto.randomBytes(20).toString('hex');

    // save updated user object
    const savedUser = await user.save();
    if (!savedUser) return res.status(500).json({ error: 'Cannot save email verify token at the moment!' });

    // send email verification link
    const link = `${req.protocol}://${req.headers.host}/validate-email-token/${savedUser.emailVerifyToken}`;

    const message = {
      to: userEmail,
      from: fromEmail,
      subject: 'INL Resilience - verify your email',
      text: `Hello, thanks for registering on the INL Resilience site.\nPlease click on the following link to verify your account.\n\n${link}\n\n`,
      html: `
        <h1> Hello, <h1>
        <p>Thanks for registering on the INL Resilience site.</p>
        <p>Please click the link below to verify your account.</p>
        <a href=${link}>Verfiy your account</a>
      `,
    };

    try {
      await sendGridEmail.send(message);
      return res.status(200).json({ message: 'Verify link sent successfully!' });
    } catch (error) {
      console.error('Error sending email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
      return res.status(500).json({ message: 'Error sending verify link email' });
    }
  },
);

/**
 * @openapi
 * /api/validate-email-token:
 *   post:
 *     tags:
 *     - User
 *     summary: Validate the email token
 *     requestBody:
 *       description: The email token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailTokenInSchema'
 *           examples:
 *             example1:
 *               summary: Example1
 *               value:
 *                 username: 12345678
 *     responses:
 *       200:
 *         description: The token is valid
 *
 * components:
 *   schemas:
 *     EmailTokenInSchema:
 *       title: EmailTokenInSchema
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           description: The email token
 */
router.post(
  '/validate-email-token',
  async (req, res) => {
    const { emailToken } = req.body;

    try {
      const user = await User.findOne({
        where: { emailVerifyToken: emailToken },
      }).catch((err) => req.res.status(500).json(err));

      if (!user) return res.status(404).json({ message: 'Email validation token is invalid!' });

      // refresh user session to pull in new value of emailVerified
      req.user.emailVerified = true;
      req.login(req.user, () => {});

      user.emailVerifyToken = null;
      user.emailVerified = true;

      const savedUser = await user.save();
      if (!savedUser) return res.status(500).json({ error: 'Cannot save user email verification status at the moment!' });

      return res.status(200).json({ message: 'Email verification token is valid!' });
    } catch (error) {
      return res.status(500).json({ message: 'Error verifying email token' });
    }
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
 * /api/logged-in:
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
  '/logged-in',
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
 * /api/change-password:
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
  '/change-password',
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
 * /api/change-username:
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
  '/change-username',
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

/**
 * @openapi
 * /api/recover-password:
 *   post:
 *     tags:
 *     - User
 *     summary: Recover password
 *     requestBody:
 *       description: User's username
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecoverPasswordInSchema'
 *           examples:
 *             bob:
 *               summary: Bob
 *               value:
 *                 username: bob@mail.com
 *     responses:
 *       200:
 *         description: Reset link generated and sent to user's email
 *
 * components:
 *   schemas:
 *     RecoverPasswordInSchema:
 *       title: RecoverPasswordInSchema
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           description: The user's username
 */
router.post(
  '/recover-password',
  async (req, res) => {
    const { username } = req.body;

    const user = await User.findOne({
      where: { email: username },
    }).catch((err) => req.res.status(500).json(err));

    if (!user) return res.status(404).json({ message: 'User does not exist!' });

    // generate reset token and expiry date
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // expires in an hour

    // save updated user object
    const savedUser = await user.save();
    if (!savedUser) return res.status(500).json({ error: 'Cannot save user reset token at the moment!' });

    // send reset link
    const link = `${req.protocol}://${req.headers.host}/recover-password/${savedUser.resetPasswordToken}`;
    const message = {
      to: savedUser.email,
      from: fromEmail,
      subject: 'INL Resilience password change request',
      text: `Hi ${savedUser.email} \n\nPlease click on the following link to reset your password for the INL Resilience application.\n\n${link}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    try {
      await sendGridEmail.send(message);
      return res.status(200).json({ message: 'Reset link sent successfully!' });
    } catch (error) {
      console.error('Error sending email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
      return res.status(500).json({ message: 'Error sending reset link email' });
    }
  },
);

/**
 * @openapi
 * /api/validate-reset-token:
 *   post:
 *     tags:
 *     - User
 *     summary: Validate the reset token
 *     requestBody:
 *       description: The reset token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetTokenInSchema'
 *           examples:
 *             example1:
 *               summary: Example1
 *               value:
 *                 username: 12345678
 *     responses:
 *       200:
 *         description: The token is valid
 *
 * components:
 *   schemas:
 *     ResetTokenInSchema:
 *       title: ResetTokenInSchema
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           description: The reset token
 */
router.post(
  '/validate-reset-token',
  async (req, res) => {
    const { resetToken } = req.body;

    const user = await User.findOne({
      where: { resetPasswordToken: resetToken, resetPasswordExpires: { [Op.gt]: Date.now() } },
    }).catch((err) => req.res.status(500).json(err));

    if (!user) return res.status(404).json({ message: 'Password reset token is invalid or expired' });

    return res.status(200).json({ message: 'Reset token is valid!' });
  },
);

/**
 * @openapi
 * /api/reset-password:
 *   post:
 *     tags:
 *     - User
 *     summary: Reset password
 *     requestBody:
 *       description: The new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordInSchema'
 *           examples:
 *             example1:
 *               summary: Example1
 *               value:
 *                 password: newPassword
 *                 resetToken: 12345678
 *     responses:
 *       200:
 *         description: Password has been reset
 *
 * components:
 *   schemas:
 *     ResetPasswordInSchema:
 *       title: ResetPasswordInSchema
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           description: The new password
 *         resetToken:
 *           type: string
 *           description: The user's reset token
 */
router.post(
  '/reset-password',
  async (req, res) => {
    const { password, resetToken } = req.body;

    const user = await User.findOne({
      where: { resetPasswordToken: resetToken },
    }).catch((err) => req.res.status(500).json(err));

    if (!user) return res.status(404).json({ message: 'Password reset token is invalid' });

    // reset password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // save updated user object
    const savedUser = await user.save();
    if (!savedUser) return res.status(500).json({ error: 'Cannot save new password at the moment!' });

    return res.status(200).json({ message: 'Password reset!' });
  },
);

/**
 * @openapi
 * /api/delete-account:
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - User
 *     summary: Delete user's account
 *     responses:
 *       200:
 *         description: Account deleted
 */
router.delete(
  '/delete-account',
  ensureLoggedIn(),
  async (req, res) => {
    const user = await User.findOne({
      where: { email: req.user.email },
    }).catch((err) => req.res.status(500).json(err));

    if (!user) return res.status(404).json({ message: 'User does not exist!' });

    req.logout();
    await user.destroy();
    return res.status(200).json({ message: 'User account deleted' });
  },
);

/**
 * @openapi
 * /api/times-visited:
 *   get:
 *     tags:
 *     - User
 *     summary: Get times visited of a user
 *     responses:
 *       200:
 *         description: Returns a number that is times visted of a user
 *
 */
router.get('/times-visited', async (req, res) => {
  // Always show the tutorial for guest users
  if (req.user == null) return res.status(200).json(0);

  // Never show tutorial for admin
  if (req.user.isAdmin) return res.status(200).json(3);

  const result = await User.findOne({
    where: { id: req.user.id },
  }).catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

  if (!result) return res.status(404).send('User not found');

  return res.status(200).json(result.timesVisited);
});

module.exports = router;
