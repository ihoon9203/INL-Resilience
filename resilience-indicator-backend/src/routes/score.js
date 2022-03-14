// eslint-disable/no-extraneous-dependencies
const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../models/index');

const { Survey, Score, User } = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api/all-scores:
 *   get:
 *     tags:
 *     - Score
 *     summary: Get all user score for specified survey
 *     responses:
 *       200:
 *         description: Returns all user score of survey.
 */
router.get(
  '/all-scores',
  async (req, res) => {
    // check for guest user
    if (req.user == null) return res.status(200).json({ message: 'guest user' });

    const results = await Score.findAll({
      where: { userId: req.user.id },
      include: [{ model: Survey, attributes: ['category'] }],
    }).catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

    if (!results) return res.status(404).send('User not found');

    const returnVal = {};
    for (let i = 0; i < results.length; i += 1) {
      returnVal[results[i].Survey.category] = results[i].score;
    }
    return res.status(200).json(returnVal);
  },
);

/**
 * @openapi
 * /api/score/{survey}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Score
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
