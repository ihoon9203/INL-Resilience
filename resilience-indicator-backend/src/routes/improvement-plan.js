const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../models/index');

const {
  Survey, Answer, Question, Subcategory, CorrectAnswer, PossibleAnswer, ImprovementPlan,
} = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api/improvement-plan-tasks/{survey}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Improvement Plan
 *     summary: Get improvement plan tasks for specified survey for user
 *     parameters:
 *     - name: survey
 *       description: short-name for survey
 *       in: path
 *       required: true
 *       type: string
 *       enum: [health, cyber, finance, emergency]
 *     responses:
 *       200:
 *         description: Returns list of improvement plan tasks for the user
 */
router.get(
  '/improvement-plan-tasks/:survey',
  ensureLoggedIn(),
  async (req, res) => {
    const userAnswers = await Answer.findAll({
      attributes: ['answer'],
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

    const correctAnswers = await CorrectAnswer.findAll({
      attributes: ['correctAnswer'],
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
      where: { '$Question->Subcategory->Survey.category$': req.params.survey },
    });

    const possibleAnswers = await PossibleAnswer.findAll({
      attributes: ['possibleAnswer'],
      include: [
        {
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
        },
        { model: ImprovementPlan },
      ],
      where: { '$Question->Subcategory->Survey.category$': req.params.survey },
    });

    // filter to only incorrect userAnswers
    const incorrectUserAnswers = [];
    userAnswers.forEach((answer) => {
      const correctAnswer = correctAnswers.find((c) => c.Question.id === answer.Question.id);
      // TODO: this is a hacky fix (consider instead making IP tasks null for N/A answers)
      if (answer.answer !== correctAnswer.correctAnswer && answer.answer !== 'Not applicable') {
        incorrectUserAnswers.push(answer);
      }
    });

    // gather improvement plan tasks
    const improvementPlanTasks = [];
    incorrectUserAnswers.forEach((incorrectAnswer) => {
      const improvementPlan = possibleAnswers.find(
        (p) => p.Question.id === incorrectAnswer.Question.id
          && p.possibleAnswer === incorrectAnswer.answer,
      );
      if (improvementPlan) {
        const task = {
          task: improvementPlan.ImprovementPlan.task,
          priority: improvementPlan.ImprovementPlan.priority,
        };
        improvementPlanTasks.push(task);
      }
    });

    return res.status(200).json(improvementPlanTasks);
  },
);

module.exports = router;
