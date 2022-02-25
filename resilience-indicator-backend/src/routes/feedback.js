const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../models/index');

const { Feedback, FeedbackCategory } = sequelize.models;
const router = express.Router();

/* --------------- FEEDBACK CATEGORIES --------------- */

/**
 * @openapi
 * /api/feedback-categories:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Feedback
 *     summary: Get the feedback categories
 *     responses:
 *       200:
 *         description: Returns feedback categories.
 */
router.get(
  '/feedback-categories',
  ensureLoggedIn(),
  async (req, res) => {
    const results = await FeedbackCategory.findAll().catch((err) => {
      console.log('DB_ERROR: ', err);
      return res.status(500).send('INTERNAL_ERROR: ', err);
    });

    // No results found
    if (!results) return res.status(200).json({});

    return res.status(200).json(results);
  },
);

/* --------------- FEEDBACK --------------- */

/**
 * @openapi
 * /api/feedback/{categoryId}:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Feedback
 *     summary: Create new feedback for given category
 *     parameters:
 *     - name: categoryId
 *       description: Feedback category id
 *       in: path
 *       required: true
 *       type: int
 *     requestBody:
 *       description: New feedback for given category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackCreateInSchema'
 *           examples:
 *             example1:
 *               summary: example1
 *               value:
 *                 feedback: "New feedback"
 *     responses:
 *       201:
 *         description: Feedback created
 *
 * components:
 *   schemas:
 *     FeedbackCreateInSchema:
 *       title: FeedbackCreateInSchema
 *       type: object
 *       properties:
 *         feedback:
 *           type: string
 *           description: The new feedback
 */
router.post(
  '/feedback/:categoryId',
  ensureLoggedIn(),
  async (req, res) => {
    const { feedback } = req.body;

    const feedbackTrim = feedback.trim();

    const newFeedback = new Feedback({
      feedback: feedbackTrim,
      feedbackCategoryId: req.params.categoryId,
      resolved: false,
    });
    const savedFeedback = await newFeedback.save().catch((err) => {
      console.log('Error: ', err);
      res.status(500).json({ error: 'Cannot save new feedback at the moment!' });
    });

    if (!savedFeedback) return res.status(500).json({ error: 'Cannot save new feedback at the moment!' });
    return res.status(201).json({ message: 'Feedback created!' });
  },
);

module.exports = router;
