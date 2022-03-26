/* eslint-disable no-restricted-syntax */
const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../models/index');

const { Survey, Score, User } = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api/latest-scores:
 *   get:
 *     tags:
 *     - Score
 *     summary: Get latest user scores for all categories
 *     responses:
 *       200:
 *         description: Returns latest user scores for all categories
 */
router.get(
  '/latest-scores',
  async (req, res) => {
    // check for guest user
    if (req.user == null) return res.status(200).json({ message: 'guest user' });

    const results = await Score.findAll({
      where: { userId: req.user.id },
      include: [{ model: Survey, attributes: ['category'] }],
    }).catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

    if (!results) return res.status(404).send('User not found');

    const latestScores = {};
    for (let i = 0; i < results.length; i += 1) {
      const cat = results[i].Survey.category;
      const { createdAt } = results[i];

      if (cat in latestScores) {
        // Get latest score
        if (latestScores[cat].createdAt < createdAt) {
          latestScores[cat] = results[i];
        }
      } else {
        latestScores[cat] = results[i];
      }
    }

    const returnVal = {};
    for (const c in latestScores) {
      if (Object.hasOwnProperty.call(latestScores, c)) {
        returnVal[c] = latestScores[c].score;
      }
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
 *     summary: Get latest user score for specified survey
 *     parameters:
 *     - name: survey
 *       description: short-name for survey
 *       in: path
 *       required: true
 *       type: string
 *       enum: [health, cyber, finance, emergency]
 *     responses:
 *       200:
 *         description: Returns latest user score of survey.
 */
router.get(
  '/score/:survey',
  ensureLoggedIn(),
  async (req, res) => {
    const results = await Score.findOne({
      include: [{ model: User, attributes: { exclude: ['password'] } }, { model: Survey }],
      where: { userId: req.user.id, '$Survey.category$': req.params.survey },
      order: [['createdAt', 'DESC']],
    }).catch((err) => {
      console.log('DB_ERROR: ', err);
      return res.status(500).send('INTERNAL_ERROR: ', err);
    });

    if (!results) return res.status(404).send(`Survey Score for "${req.params.survey}" Not Found`);
    return res.status(200).json(results);
  },
);

module.exports = router;
