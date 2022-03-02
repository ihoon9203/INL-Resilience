const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../models/index');

const {
  Survey, Subcategory, Question, Answer,
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
      include: [{ model: Subcategory, include: [{ model: Question }] }],
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
 * /api/saveAnswer:
 *   post:
 *     tags:
 *     - Survey
 *     summary: Save answers
 *     requestBody:
 *       description: Answer list
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerSaveInSchema'
 *     responses:
 *       201:
 *         description: Answers saved
 *
 * components:
 *   schemas:
 *     AnswerSaveInSchema:
 *       title: AnswerSaveInSchema
 *       type: object
 *       properties:
 *         answerList:
 *           type: array
 *           description: The user's answers
 *           items:
 *             type: object
 */
router.post('/saveAnswer', async (req, res) => {
  const answerList = req.body;
  let reassignId = null;

  if (req.user) {
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
