const express = require('express');
// const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../models/index');

const { Survey, Score } = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api/all-scores:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Score
 *     summary: Get all user score for specified survey
 *     responses:
 *       200:
 *         description: Returns all user score of survey.
 */
router.get(
  '/all-scores',
  // ensureLoggedIn(), // middleware function logged in: good
  // not : not logged in removing it for guest user
  async (req, res) => { // req: request object res: respond object you get.
    // calling score model. finding unique value where userId == user actually requesting.
    if (req.user == null) {
      console.log('guest user');
      return res.status(204).send('GUEST_USER');
    }
    const results = await Score.findAll({
      where: { userId: req.user.id },
      include: [{ model: Survey, attributes: ['category'] }],
    }).catch((err) => {
      console.log('DB_ERROR: ', err);
      return res.status(500).send('INTERNAL_ERROR: ', err);
    });

    if (!results) return res.status(404).send('User not found');
    console.log(results);
    const catList = {};
    for (let i = 0; i < results.length; i += 1) {
      catList[results[i].Survey.category] = results[i].score;
    }
    console.log(catList);
    return res.status(200).json(catList);
  },
);

module.exports = router;
