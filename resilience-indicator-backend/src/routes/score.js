// eslint-disable/no-extraneous-dependencies
const express = require('express');
const sequelize = require('../models/index');

const { Survey, Score } = sequelize.models;
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
    }).catch((err) => {
      console.log('DB_ERROR: ', err);
      return res.status(500).send('INTERNAL_ERROR: ', err);
    });

    if (!results) return res.status(404).send('User not found');

    // console.log(results);
    const returnVal = {};
    for (let i = 0; i < results.length; i += 1) {
      returnVal[results[i].Survey.category] = results[i].score;
    }
    console.log(returnVal);
    return res.status(200).json(returnVal);
  },
);

module.exports = router;
