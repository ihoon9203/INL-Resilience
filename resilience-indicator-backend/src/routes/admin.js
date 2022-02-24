const express = require('express');
const sequelize = require('../models/index');

const { PossibleAnswer, Question, Subcategory, Survey } = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api/subcategories/{survey}:
 *   get:
 *     tags:
 *     - Subcategory
 *     summary: Get subcategories for a specified survey
 *     parameters:
 *     - name: survey
 *       description: short-name for survey
 *       in: path
 *       required: true
 *       type: string
 *       enum: [Health, Cyber, Finance, Emergency]
 *     responses:
 *       200:
 *         description: Returns list of survey subcategories
 *
 */
router.get('/subcategories/:survey', async (req, res) => {
  const results = await Survey.findOne({
    where: { category: req.params.survey },
    include: [{ model: Subcategory }],
  });
  if (!results) return res.status(404).send(`Survey "${req.params.survey}" Not Found`);

  const returnVal = {};
  for (let i = 0; i < results.Subcategories.length; i += 1) {
    returnVal[results.Subcategories[i].subcategory] = results.Subcategories[i].id;
  }
  return res.status(200).json(returnVal);
});

/**
 * @openapi
 * /api/questions/{subcategory}:
 *   get:
 *     tags:
 *     - Question
 *     summary: Get questions for a specified subcategory
 *     parameters:
 *     - name: subcategory
 *       description: name for subcategory
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Returns list of questions in a subcategory
 *
 */
 router.get('/questions/:subcategory', async (req, res) => {
  console.log(req.params.subcategory);
  const results = await Subcategory.findOne({
    where: { subcategory: req.params.subcategory },
    include: [{ model: Question }],
  });
  if (!results) return res.status(404).send(`Subcategory "${req.params.subcategory}" Not Found`);

  console.log(results);
  // const returnVal = {};
  // for (let i = 0; i < results.Subcategories.length; i += 1) {
  //   returnVal[results.Subcategories[i].subcategory] = results.Subcategories[i].id;
  // }
  return res.status(200).json(results);
});

/**
 * @openapi
 * /api/create-question:
 *   post:
 *     tags:
 *     - Question
 *     summary: Add new question to a survey
 *     requestBody:
 *       description: The question to create
 *       required: true
 *
 *     responses:
 *       201:
 *         description: New question added
 *
 */
router.post('/create-question', async (req, res) => {
  const { subcategoryId, question, weight, information } = req.body;

  // Validate request
  if (!question) {
    res.status(400).send({
      message: 'Question cannot be empty!',
    });
    return;
  }

  // Create a Question
  const newQuestion = {
    subcategoryId,
    question,
    weight,
    information: information === '' ? null : information,
  };

  // Save Question in the database
  Question.create(newQuestion)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
            err.message || 'Error occurred while creating the question.',
      });
    });
});

/**
 * @openapi
 * /api/create-possible-answer:
 *   post:
 *     tags:
 *     - Possible Answer
 *     summary: Add possible answers to a question
 *     requestBody:
 *       description: The possible answers to create
 *       required: true
 *
 *     responses:
 *       201:
 *         description: New possible answer added
 *
 */
  router.post('/create-possible-answer', async (req, res) => {
    console.log(req.body);
    const { question, possibleAnswers } = req.body;
    
    // Validate request
    if (!possibleAnswers) {
      res.status(400).send({
        message: 'Answer cannot be empty!',
      });
      return;
    }

    // Find question ID
    const questionId = await Question.findOne({
      where: { question: question },
      attributes: ['id']
    });

    possibleAnswers.forEach((answer) => {
      // Create a PossibleAnswer
      const newPossibleAnswer = {
        questionId,
        answer,
      };

      // Save PossibleAnswer in the database
      PossibleAnswer.create(newPossibleAnswer)
      .then((data) => {
        res.send(data);
        console.log(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
              err.message || 'Error occurred while creating the question.',
        });
      });
    })
  });


module.exports = router;
