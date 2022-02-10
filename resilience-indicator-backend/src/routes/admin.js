const express = require('express');
const sequelize = require('../models/index');

const { Question } = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api/create-question:
 *   post:
 *     tags:
 *     - Admin
 *     summary: Add new question to a survey
 *     requestBody:
 *       description: The question to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuestionInSchema'
 *           examples:
 *             example1:
 *               summary: Example1
 *               value:
 *                 question: "This is a question"
 *                 weight: 10
 *                 information: "This is information tooltip"
 *     responses:
 *       200:
 *         description: New question added
 *
 * components:
 *   schemas:
 *     CreateQuestionInSchema:
 *       title: CreateQuestionInSchema
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *           description: The question
 *         weight:
 *           type: number
 *           description: The question weight
 *         information:
 *           type: string
 *           description: The question information tooltip
 */
router.post('/admin/create-question', async (req, res) => {
  const { question, weight, information } = req.body;

  // Validate request
  if (!question) {
    res.status(400).send({
      message: 'Question cannot be empty!',
    });
    return;
  }

  // TODO: need to add possible answers? How to know which question ID it points to?

  // Create a Question
  const newQuestion = {
    question,
    weight,
    information: information || null,
  };

  // Save Question in the database
  Question.create(newQuestion)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Some error occurred while creating the Question.',
      });
    });
});

module.exports = router;
