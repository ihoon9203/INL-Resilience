const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');
const { Sequelize } = require('sequelize');
const sequelize = require('../models/index');

const { Op } = Sequelize;

const {
  Survey, Answer, Question, Subcategory, PossibleAnswer, ImprovementPlan,
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

    // get all the possible answers that have improvement plans
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
      where: {
        '$Question->Subcategory->Survey.category$': req.params.survey,
        improvementPlanId: {
          [Op.ne]: null,
        },
      },
    });

    // filter to only chosen possible answers of user
    const chosenPossibleAnswers = [];
    possibleAnswers.forEach((p) => {
      const answer = userAnswers.find((a) => a.Question.id === p.Question.id);
      if (p.possibleAnswer === answer.answer) {
        chosenPossibleAnswers.push(p);
      }
    });

    // gather improvement plan tasks
    const improvementPlanTasks = [];
    chosenPossibleAnswers.forEach((item) => {
      if (item.ImprovementPlan.task) {
        const task = {
          task: item.ImprovementPlan.task,
          priority: item.ImprovementPlan.priority,
        };
        improvementPlanTasks.push(task);
      }
    });

    return res.status(200).json(improvementPlanTasks);
  },
);

module.exports = router;
