const express = require('express');
const surveyAnswers = require('../resources/survey-answers');
const sequelize = require('../models/index');

const {
  Survey, Question, Subquestion, Answer,
} = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api/survey-questions/{survey}:
 *   get:
 *     security:
 *       bearerAuth: []
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
      include: [{ model: Question, include: [{ model: Subquestion }] }],
    });
    if (!results) return res.status(404).send(`Survey "${req.params.survey}" Not Found`);
    return res.status(200).json(results);
  },
);

/**
 * @openapi
 * /api/survey-answers/{survey}:
 *   get:
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
 *         description: Returns list of survey answers.
 */
router.get('/survey-answers/:survey', (req, res) => {
  // TODO: hookup to DB when ready
  const surveyAnswerList = surveyAnswers[`${req.params.survey}`];

  if (!surveyAnswerList) return res.status(404).send(`Survey "${req.params.survey}" Not Found`);

  return res.status(200).send(surveyAnswerList.answers);
});

router.post('/saveAnswer', async (req, res) => {
  const answerList = req.body;
  let reassignId = null;

  if (req.user) {
    // eslint-disable-next-line no-unused-vars
    reassignId = req.user.id;
  }
  answerList.forEach((obj) => {
    // eslint-disable-next-line no-param-reassign
    obj.userId = reassignId;
  });

  const answersSaved = Answer.bulkCreate(answerList);

  if (!answersSaved) return res.status(500).json({ error: 'Answer saving failed!' });
  return res.status(201).json({ message: 'Answers sent to DB successfuly!' });
});

module.exports = router;
