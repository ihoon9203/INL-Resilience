const express = require('express');
const sequelize = require('../../models/index');

const { Feedback, FeedbackCategory } = sequelize.models;
const router = express.Router();

/* --------------- FEEDBACK CATEGORIES --------------- */

/**
 * @openapi
 * /api/admin/feedback-categories:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/Feedback
 *     summary: Create new feedback category
 *     requestBody:
 *       description: New feedback category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackCategoryCreateInSchema'
 *           examples:
 *             example1:
 *               summary: example1
 *               value:
 *                 feedbackCategoryLabel: "New Category"
 *     responses:
 *       201:
 *         description: New feedback category created.
 *
 * components:
 *   schemas:
 *     FeedbackCategoryCreateInSchema:
 *       title: FeedbackCategoryCreateInSchema
 *       type: object
 *       properties:
 *         feedbackCategoryLabel:
 *           type: string
 *           description: The new feedback category
 */
router.post(
  '/admin/feedback-categories',
  async (req, res) => {
    const { feedbackCategoryLabel } = req.body;

    // format category label to get value
    const feedbackCategoryValue = feedbackCategoryLabel.trim().toLowerCase().replaceAll(' ', '-');

    const alreadyExistsFeedbackCategory = await FeedbackCategory.findOne({
      where: { feedbackCategoryValue },
    }).catch((err) => {
      console.log('Error: ', err);
    });

    if (alreadyExistsFeedbackCategory) {
      return res.status(409).json({ message: 'Feedback category already exists!' });
    }

    const newFeedbackCategory = new FeedbackCategory({
      feedbackCategoryValue,
      feedbackCategoryLabel,
    });
    const savedFeedbackCategory = await newFeedbackCategory.save().catch((err) => {
      console.log('Error: ', err);
      res.status(500).json({ error: 'Cannot save new feedback category at the moment!' });
    });

    if (!savedFeedbackCategory) return res.status(500).json({ error: 'Cannot save new feedback category at the moment!' });
    return res.status(201).json({ message: 'Feedback category created!' });
  },
);

/**
 * @openapi
 * /api/admin/feedback-categories/{id}:
 *   put:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/Feedback
 *     summary: Update feedback category
 *     parameters:
 *     - name: id
 *       description: Feedback category id
 *       in: path
 *       required: true
 *       type: int
 *     requestBody:
 *       description: Updated feedback category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackCategoryUpdateInSchema'
 *           examples:
 *             example1:
 *               summary: example1
 *               value:
 *                 feedbackCategoryLabel: "Updated category"
 *     responses:
 *       200:
 *         description: Feedback category updated.
 *
 * components:
 *   schemas:
 *     FeedbackCategoryUpdateInSchema:
 *       title: FeedbackCategoryUpdateInSchema
 *       type: object
 *       properties:
 *         feedbackCategoryLabel:
 *           type: string
 *           description: The new feedback category
 */
router.put(
  '/admin/feedback-categories/:id',
  async (req, res) => {
    const { feedbackCategoryLabel } = req.body;

    // ensure category exists
    const feedbackCategoryResult = await FeedbackCategory.findOne({
      where: { id: req.params.id },
    });
    if (!feedbackCategoryResult) return res.status(404).send(`Feedback category id ${req.params.id} Not Found`);

    // format label to get value
    const feedbackCategoryValue = feedbackCategoryLabel.trim().toLowerCase().replaceAll(' ', '-');

    // ensure new category doesn't already exist
    const alreadyExistsFeedbackCategory = await FeedbackCategory.findOne({
      where: { feedbackCategoryValue },
    }).catch((err) => {
      console.log('Error: ', err);
    });
    if (alreadyExistsFeedbackCategory) {
      return res.status(409).json({ message: 'Feedback category already exists!' });
    }

    // update feedback category
    feedbackCategoryResult.feedbackCategoryValue = feedbackCategoryValue;
    feedbackCategoryResult.feedbackCategoryLabel = feedbackCategoryLabel;

    const savedFeedbackCategory = await feedbackCategoryResult.save().catch((err) => {
      console.log('Error: ', err);
      res.status(500).json({ error: 'Cannot update feedback category at the moment!' });
    });

    if (!savedFeedbackCategory) return res.status(500).json({ error: 'Cannot update feedback category at the moment!' });
    return res.status(200).json({ message: 'Feedback category updated!' });
  },
);

/**
 * @openapi
 * /api/admin/feedback-categories/{id}:
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/Feedback
 *     summary: Delete feedback category
 *     parameters:
 *     - name: id
 *       description: Feedback category id
 *       in: path
 *       required: true
 *       type: int
 *     responses:
 *       200:
 *         description: Feedback category deleted.
 */
router.delete(
  '/admin/feedback-categories/:id',
  async (req, res) => {
    // ensure category exists
    const feedbackCategoryResult = await FeedbackCategory.findOne({
      where: { id: req.params.id },
    });
    if (!feedbackCategoryResult) return res.status(404).send(`Feedback category id ${req.params.id} Not Found`);

    // delete feedback category
    const deleted = await feedbackCategoryResult.destroy().catch((err) => {
      console.log('Error: ', err);
      res.status(500).json({ error: 'Cannot delete feedback category at the moment!' });
    });

    if (!deleted) return res.status(500).json({ error: 'Cannot delete feedback category at the moment!' });
    return res.status(200).json({ message: 'Feedback category deleted!' });
  },
);

/* --------------- FEEDBACK --------------- */

/**
 * @openapi
 * /api/admin/feedback:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/Feedback
 *     summary: Get all feedback
 *     responses:
 *       200:
 *         description: Returns all feedback.
 */
router.get(
  '/admin/feedback',
  async (req, res) => {
    const results = await Feedback.findAll().catch((err) => {
      console.log('DB_ERROR: ', err);
      return res.status(500).send('INTERNAL_ERROR: ', err);
    });

    // No results found
    if (!results) return res.status(200).json({});

    return res.status(200).json(results);
  },
);

/**
 * @openapi
 * /api/admin/feedback/{categoryId}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/Feedback
 *     summary: Get the feedback for the given feedback category
 *     parameters:
 *     - name: categoryId
 *       description: Feedback category id
 *       in: path
 *       required: true
 *       type: int
 *     responses:
 *       200:
 *         description: Returns feedback for given feedback category.
 */
router.get(
  '/admin/feedback/:categoryId',
  async (req, res) => {
    const results = await Feedback.findAll({
      where: { feedbackCategoryId: req.params.categoryId },
    }).catch((err) => {
      console.log('DB_ERROR: ', err);
      return res.status(500).send('INTERNAL_ERROR: ', err);
    });

    // No results found
    if (!results) return res.status(200).json({});

    return res.status(200).json(results);
  },
);

/**
 * @openapi
 * /api/admin/feedback/{feedbackId}:
 *   put:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/Feedback
 *     summary: Update feedback resolved status
 *     parameters:
 *     - name: feedbackId
 *       description: Feedback id
 *       in: path
 *       required: true
 *       type: int
 *     requestBody:
 *       description: Updated feedback resolve status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackUpdateInSchema'
 *           examples:
 *             example1:
 *               summary: example1
 *               value:
 *                 resolved: true
 *     responses:
 *       200:
 *         description: Feedback resolve status updated.
 *
 * components:
 *   schemas:
 *     FeedbackUpdateInSchema:
 *       title: FeedbackUpdateInSchema
 *       type: object
 *       properties:
 *         resolved:
 *           type: boolean
 *           description: The new feedback resolve status
 */
router.put(
  '/admin/feedback/:feedbackId',
  async (req, res) => {
    const { resolved } = req.body;

    // ensure category exists
    const feedbackResult = await Feedback.findOne({
      where: { id: req.params.feedbackId },
    });
    if (!feedbackResult) return res.status(404).send(`Feedback id ${req.params.feedbackId} Not Found`);

    // update feedback resolved status
    feedbackResult.resolved = resolved;

    const savedFeedback = await feedbackResult.save().catch((err) => {
      console.log('Error: ', err);
      res.status(500).json({ error: 'Cannot update feedback resolved status at the moment!' });
    });

    if (!savedFeedback) return res.status(500).json({ error: 'Cannot update feedback resolved status at the moment!' });
    return res.status(200).json({ message: 'Feedback resolved status updated!' });
  },
);

/**
 * @openapi
 * /api/admin/feedback/{feedbackId}:
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/Feedback
 *     summary: Delete feedback
 *     parameters:
 *     - name: feedbackId
 *       description: Feedback id
 *       in: path
 *       required: true
 *       type: int
 *     responses:
 *       200:
 *         description: Feedback deleted.
 */
router.delete(
  '/admin/feedback/:feedbackId',
  async (req, res) => {
    // ensure feedback exists
    const feedbackResult = await Feedback.findOne({
      where: { id: req.params.feedbackId },
    });
    if (!feedbackResult) return res.status(404).send(`Feedback id ${req.params.feedbackId} Not Found`);

    // delete feedback
    const deleted = await feedbackResult.destroy().catch((err) => {
      console.log('Error: ', err);
      res.status(500).json({ error: 'Cannot delete feedback at the moment!' });
    });

    if (!deleted) return res.status(500).json({ error: 'Cannot delete feedback at the moment!' });
    return res.status(200).json({ message: 'Feedback deleted!' });
  },
);

module.exports = router;
