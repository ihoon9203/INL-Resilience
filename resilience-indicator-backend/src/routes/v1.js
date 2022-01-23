const express = require('express');
const surveyAnswers = require('../resources/survey-answers');
const pjson = require('../../package.json');
const sequelize = require('../models/index');

const { Survey, Question, Subquestion } = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api:
 *   get:
 *     tags:
 *     - Info
 *     description: Welcome to the Resilience Indicator API!
 *     responses:
 *       200:
 *         description: Returns a welcome message.
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Resilience Indicator API!',
  });
});

/**
 * @openapi
 * /api/version:
 *   get:
 *     tags:
 *     - Info
 *     description: Get the API version.
 *     responses:
 *       200:
 *         description: Returns the API version.
 */
router.get('/version', (req, res) => {
  res.json({
    version: pjson.version,
  });
});

/**
 * @openapi
 * /api/survey-questions/{survey}:
 *   get:
 *     tags:
 *     - Survey Questions
 *     description: Get survey questions for specified survey.
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
router.get('/survey-questions/:survey', async (req, res) => {
  const results = await Survey.findOne({
    where: { category: req.params.survey },
    include: [{ model: Question, include: [{ model: Subquestion }] }],
  });
  if (!results) return res.status(404).send(`Survey "${req.params.survey}" Not Found`);
  return res.status(200).json(results);
});

/**
 * @openapi
 * /api/survey-answers/{survey}:
 *   get:
 *     tags:
 *     - Survey Answers
 *     description: Get survey answers for specified survey.
 *     parameters:
 *     - name: survey
 *       description: short-name for survey
 *       in: path
 *       required: true
 *       type: string
 *       enum: [health, cyber, finance, emergency]
 *     responses:
 *       200:
 *         description: Returns list of survey answers.
 */
router.get('/survey-answers/:survey', (req, res) => {
  // TODO: hookup to DB when ready
  const surveyAnswerList = surveyAnswers[`${req.params.survey}`];

  if (!surveyAnswerList) return res.status(404).send(`Survey "${req.params.survey}" Not Found`);

  return res.status(200).send(surveyAnswerList.answers);
});

module.exports = router;
