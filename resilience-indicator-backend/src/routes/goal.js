// eslint-disable/no-extraneous-dependencies
const express = require('express');
const sequelize = require('../models/index');

const { Goal } = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api/goal:
 *   get:
 *     tags:
 *     - Goal
 *     summary: Get all user goals
 *     responses:
 *       200:
 *         description: Returns all user goals.
 */
router.get(
  '/goal',
  async (req, res) => {
    // check for guest user
    if (req.user == null) return res.status(200).json({ message: 'guest user' });

    const results = await Goal.findAll({
      where: { userId: req.user.id },
    }).catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

    if (!results) return res.status(404).send('User not found');

    // console.log(results);
    return res.status(200).json(results);
  },
);
/**
 * @openapi
 * /api/cpgoal:
 *   get:
 *     tags:
 *     - Goal
 *     summary: Get 2 completed goals.
 *     responses:
 *       200:
 *         description: Returns 2 completed goals.
 */
router.get(
  '/cpgoal',
  async (req, res) => {
    // check for guest user
    if (req.user == null) return res.status(200).json({ message: 'guest user' });

    const results = await Goal.findAll({
      where: { userId: req.user.id, completed: 1 },
      order: ['dueDate'],
      limit: 2,
    }).catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

    if (!results) return res.status(404).send('User not found');

    // console.log(results);
    return res.status(200).json(results);
  },
);
/**
 * @openapi
 * /api/ipgoal:
 *   get:
 *     tags:
 *     - Goal
 *     summary: Get 2 in-progress goals
 *     responses:
 *       200:
 *         description: Returns 2 in-progress goals.
 */
router.get(
  '/ipgoal',
  async (req, res) => {
    // check for guest user
    if (req.user == null) return res.status(200).json({ message: 'guest user' });

    const results = await Goal.findAll({
      where: { userId: req.user.id, completed: 0 },
      order: ['dueDate'],
      limit: 2,
    }).catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

    if (!results) return res.status(404).send('User not found');

    // console.log(results);
    return res.status(200).json(results);
  },
);
module.exports = router;
