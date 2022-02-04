const express = require('express');
// const bcrypt = require('bcryptjs');
// const { ensureLoggedIn } = require('connect-ensure-login');
// const passport = require('../auth/passport');
const sequelize = require('../models/index');

const { Question } = sequelize.models;
const router = express.Router();

// TODO: fix this documentation

/**
 * @openapi
 * /api/create-question:
 *   post:
 *     summary: Add new question to a survey
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: New question added
 *
 * components:
 *
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
