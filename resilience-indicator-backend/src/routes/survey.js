/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../models/index');

const {
  Survey, Subcategory, Question, Answer, CorrectAnswer, Score,
} = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api/survey-questions/{survey}:
 *   get:
 *     tags:
 *     - Survey
 *     summary: Get survey questions for specified survey
 *     parameters:
 *     - name: survey
 *       description: short-name for survey
 *       in: path
 *       required: true
 *       type: string
 *       enum: [health, cyber, finance, emergency]
 *     responses:
 *       200:
 *         description: Returns list of survey questions.
 */
router.get(
  '/survey-questions/:survey',
  async (req, res) => {
    const results = await Survey.findOne({
      where: { category: req.params.survey },
      include: [{ model: Subcategory, include: [{ model: Question }] }],
    });
    if (!results) return res.status(404).send(`Survey "${req.params.survey}" Not Found`);
    return res.status(200).json(results);
  },
);

/**
 * @openapi
 * /api/survey-questions-guest/{survey}:
 *   get:
 *     tags:
 *     - Survey
 *     summary: Get survey question in guest format for specified survey
 *     parameters:
 *     - name: survey
 *       description: short-name for survey
 *       in: path
 *       required: true
 *       type: string
 *       enum: [health, cyber, finance, emergency]
 *     responses:
 *       200:
 *         description: Returns list of survey questions in guest format
 */
router.get(
  '/survey-questions-guest/:survey',
  async (req, res) => {
    const results = await Question.findAll({
      attributes: ['id', 'weight', 'question', 'information'],
      include: [{
        model: Subcategory,
        attributes: ['subcategory'],
        include: [{
          model: Survey,
          attributes: [],
        }],
      }],
      where: { '$Subcategory->Survey.category$': req.params.survey },
    });

    if (!results) return res.status(404).send(`Survey "${req.params.survey}" Not Found`);
    return res.status(200).json(results);
  },
);

/**
 * @openapi
 * /api/survey-answers/{survey}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Survey
 *     summary: Get survey answers for specified survey
 *     parameters:
 *     - name: survey
 *       description: short-name for survey
 *       in: path
 *       required: true
 *       type: string
 *       enum: [health, cyber, finance, emergency]
 *     responses:
 *       200:
 *         description: Returns list of survey answers for the user
 */
router.get(
  '/survey-answers/:survey',
  ensureLoggedIn(),
  async (req, res) => {
    const results = await Answer.findAll({
      attributes: ['answer'],
      include: [{
        model: Question,
        attributes: ['id', 'weight', 'question', 'information'],
        include: [{
          model: Subcategory,
          attributes: ['subcategory'],
          include: [{
            model: Survey,
            attributes: [],
          }],
        }],
      }],
      where: { userId: req.user.id, '$Question->Subcategory->Survey.category$': req.params.survey },
    });

    if (!results) return res.status(404).send(`Survey "${req.params.survey}" Not Found`);
    return res.status(200).json(results);
  },
);

/**
 * @openapi
 * /api/submit-survey/{survey}:
 *   post:
 *     tags:
 *     - Survey
 *     summary: Submit survey answers for given survey
 *     parameters:
 *     - name: survey
 *       description: short-name for survey
 *       in: path
 *       required: true
 *       type: string
 *       enum: [health, cyber, finance, emergency]
 *     requestBody:
 *       description: Answer list
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubmitSurveyInSchema'
 *           examples:
 *             healthExample:
 *               summary: HealthExample
 *               value:
 *                 userAnswers: [{questionId: 34, answer: 'Yes'},{questionId: 35, answer: 'No'},{questionId: 36, answer: 'Yes'},{questionId: 37, answer: 'No'},{questionId: 38, answer: 'Yes'},{questionId: 39, answer: 'No'},{questionId: 40, answer: 'Yes'},{questionId: 41, answer: 'No'},{questionId: 42, answer: 'Yes'},{questionId: 43, answer: 'No'}]
 *     responses:
 *       200:
 *         description: Survey submission saved
 *
 * components:
 *   schemas:
 *     SubmitSurveyInSchema:
 *       title: SubmitSurveyInSchema
 *       type: array
 *       properties:
 *         userAnswers:
 *           type: array
 *           description: The user's answers with question ids
 *           items:
 *             type: object
 */
router.post(
  '/submit-survey/:survey',
  async (req, res) => {
    const { userAnswers } = req.body;
    const userId = req.user ? req.user.id : null;

    let preExistingUserAnswers = [];
    if (userId) {
      preExistingUserAnswers = await Answer.findAll({
        include: [{
          model: Question,
          attributes: ['id'],
          include: [{
            model: Subcategory,
            attributes: [],
            include: [{
              model: Survey,
              attributes: [],
            }],
          }],
        }],
        where: { userId: req.user.id, '$Question->Subcategory->Survey.category$': req.params.survey },
      });
    }

    if (preExistingUserAnswers.length !== 0) {
      // update pre-existing answers
      preExistingUserAnswers.forEach(async (p) => {
        const newAnswer = userAnswers.find((a) => a.questionId === p.Question.id);
        p.answer = newAnswer.answer;
        const saveNewAnswer = await p.save();
        if (!saveNewAnswer) res.status(500).json({ error: 'Cannot save new answer at the moment!' });
      });
    } else {
      // Save new answers
      userAnswers.forEach((a) => {
        a.userId = userId;
      });
      const answersSaved = Answer.bulkCreate(userAnswers);
      if (!answersSaved) return res.status(500).json({ error: 'Answer saving failed!' });
    }

    // Get correct answers
    const correctAnswers = await CorrectAnswer.findAll({
      attributes: ['correctAnswer'],
      include: [{
        model: Question,
        attributes: ['id', 'weight'],
        include: [{
          model: Subcategory,
          attributes: [],
          include: [{
            model: Survey,
            attributes: [],
          }],
        }],
      }],
      where: { '$Question->Subcategory->Survey.category$': req.params.survey },
    });

    // Ensure enough answers were provided
    if (correctAnswers.length !== userAnswers.length) {
      return res.status(400).json({ error: 'Bad request: not enough user answers provided for specified survey' });
    }

    // Get survey total score
    let surveyTotalScore = 0;
    correctAnswers.forEach((ca) => {
      surveyTotalScore += ca.Question.weight;
    });

    // Calculate user score
    let userScore = 0;
    userAnswers.forEach((answer) => {
      const correctAnswer = correctAnswers.find((c) => c.Question.id === answer.questionId);
      if (answer.answer === correctAnswer.correctAnswer) {
        userScore += correctAnswer.Question.weight;
      } else if (answer.answer === 'Not applicable') {
        surveyTotalScore -= correctAnswer.Question.weight;
      }
    });

    // Get percentage score
    // eslint-disable-next-line eqeqeq
    userScore = surveyTotalScore.toFixed() == 0 ? 100 : (userScore / surveyTotalScore) * 100;
    userScore = userScore.toFixed();

    // Save user score only if logged in
    if (userId) {
      // Get survey id
      const survey = await Survey.findOne({
        where: { category: req.params.survey },
      });
      const surveyId = survey.id;

      // Otherwise save new score
      const newScore = new Score({
        score: userScore, surveyId, userId,
      });
      const savedNewScore = await newScore.save().catch((err) => {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Cannot save new score at the moment!' });
      });
      if (!savedNewScore) return res.status(500).json({ error: 'Cannot save new score at the moment!' });
      return res.status(200).json(savedNewScore);
    }

    // Return just the score if a guest user
    return res.status(200).json({ score: userScore });
  },
);

module.exports = router;
