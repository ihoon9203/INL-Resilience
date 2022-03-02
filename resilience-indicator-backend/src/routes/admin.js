const express = require('express');
const sequelize = require('../models/index');

const {
  CorrectAnswer, PossibleAnswer, Question, Subcategory, Survey,
} = sequelize.models;
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
 * /api/questions/{survey}:
 *   get:
 *     tags:
 *     - Question
 *     summary: Get all questions for a specified survey
 *     parameters:
 *     - name: survey
 *       description: short-name for survey
 *       in: path
 *       required: true
 *       type: string
 *       enum: [Health, Cyber, Finance, Emergency]
 *     responses:
 *       200:
 *         description: Returns list of questions in a survey
 *
 */
router.get('/questions/:survey', async (req, res) => {
  const results = await Survey.findOne({
    where: { category: req.params.survey },
    include: [
      {
        model: Subcategory,
        include: [
          { model: Question },
        ],
      },
    ],
  });

  if (!results) return res.status(404).send(`Survey "${req.params.survey}" Not Found`);
  const returnVal = {};
  results.Subcategories.forEach((subcategory) => {
    subcategory.Questions.forEach((question) => {
      returnVal[question.question] = question.id;
    });
  });
  return res.status(200).json(returnVal);
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
  const {
    subcategoryId, question, weight, information,
  } = req.body;

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
    .then((data) => res.send(data))
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
  const { question, possibleAnswers } = req.body;

  // Validate request
  if (!possibleAnswers) {
    res.status(400).send({
      message: 'Possible answers cannot be empty!',
    });
    return;
  }

  // Find question ID
  const currentQuestion = await Question.findOne({
    where: { question },
    attributes: ['id'],
  });
  const questionId = currentQuestion.id;

  const answersArr = [];
  possibleAnswers.forEach((possibleAnswer) => {
    // Create a PossibleAnswer
    const newPossibleAnswer = { questionId, possibleAnswer, improvementPlanId: null };

    answersArr.push(newPossibleAnswer);
  });
  // Save possible answers in the db
  PossibleAnswer.bulkCreate(answersArr)
    .then((data) => {
      res.send(data);
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
 * /api/create-correct-answer:
 *   post:
 *     tags:
 *     - Correct Answer
 *     summary: Add correct answer for a question
 *     requestBody:
 *       description: The correct answer to create
 *       required: true
 *
 *     responses:
 *       201:
 *         description: New correct answer added
 */
router.post('/create-correct-answer', async (req, res) => {
  const { question, correctAnswer } = req.body;

  // Validate request
  if (!correctAnswer) {
    res.status(400).send({
      message: 'Correct answer cannot be empty!',
    });
    return;
  }

  // Find question ID
  const currentQuestion = await Question.findOne({
    where: { question },
    attributes: ['id'],
  });

  const questionId = currentQuestion.id;
  // Create a Question
  const newCorrectAnswer = {
    questionId,
    correctAnswer,
  };

  // Save possible answers in the db
  CorrectAnswer.create(newCorrectAnswer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error occurred while creating the correct answer.',
      });
    });
});

/**
 * @openapi
 * /api/remove-question:
 *   post:
 *     tags:
 *     - Question
 *     summary: Remove a question
 *     requestBody:
 *       description: The question to remove
 *       required: true
 *
 *     responses:
 *       201:
 *         description: Question removed
 *
 */
router.post('/remove-question', async (req, res) => {
  const { questionId } = req.body;
  await Question.destroy({
    where: { id: questionId },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Question was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Question with id=${questionId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Question: ${err}`,
      });
    });
});

/**
 * @openapi
 * /api/update-question:
 *   post:
 *     tags:
 *     - Question
 *     summary: Update an existing question
 *     requestBody:
 *       description: The question to update
 *       required: true
 *
 *     responses:
 *       201:
 *         description: Question was updated
 *
 */
router.post('/update-question', async (req, res) => {
  const {
    currentQuestion, newQuestion, weight, information,
  } = req.body;

  // Validate request
  if (!currentQuestion) {
    res.status(400).send({
      message: 'Question to update cannot be empty!',
    });
    return;
  }

  await Question.findOne({
    where: { question: currentQuestion },
  })
    .then((record) => {
      if (!record) {
        throw new Error('No record found');
      }

      const values = {
        question: newQuestion === '' ? record.question : newQuestion,
        weight: weight === 0 ? record.weight : weight,
        information: information === '' ? record.information : information,
      };

      record.update(values)
        .then((updatedRecord) => {
          res.status(200).json(updatedRecord);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * @openapi
 * /api/remove-possible-answer:
 *   post:
 *     tags:
 *     - Possible Answer
 *     summary: Remove possible answers to a question
 *     requestBody:
 *       description: The possible answers to remoe
 *       required: true
 *
 *     responses:
 *       201:
 *         description: Possible answers removed
 *
 */
router.post('/remove-possible-answer', async (req, res) => {
  const { questionId } = req.body;

  // Validate request
  if (!questionId) {
    res.status(400).send({
      message: 'Question cannot be empty!',
    });
    return;
  }

  await PossibleAnswer.destroy({ where: { questionId }, })
  .then((data) => {
    console.log(data);
    res.sendStatus(200);
  })
  .catch((err) => {
    res.status(500).send({
      message: `Could not delete PossibleAnswer: ${err}`,
    });
  });
});

/**
 * @openapi
 * /api/update-correct-answer:
 *   post:
 *     tags:
 *     - CorrectAnswer
 *     summary: Update a correct answer
 *     requestBody:
 *       description: The correct answer to update
 *       required: true
 *
 *     responses:
 *       201:
 *         description: Correct answer was updated
 *
 */
 router.post('/update-correct-answer', async (req, res) => {
  const {
    questionId, correctAnswer
  } = req.body;

  // Validate request
  if (!correctAnswer) {
    res.status(400).send({
      message: 'Correct answer to update cannot be empty!',
    });
    return;
  }

  await CorrectAnswer.findOne({
    where: { questionId },
  })
    .then((record) => {
      if (!record) {
        throw new Error('No correct answer record found');
      }

      const values = {
        correctAnswer,
      };

      record.update(values)
        .then((updatedRecord) => {
          res.status(200).json(updatedRecord);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// TODO: should they be adding improvement plan tasks as well when creating/updating a question?
// might add that later

module.exports = router;
