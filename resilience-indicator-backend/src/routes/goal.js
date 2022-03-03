// eslint-disable/no-extraneous-dependencies
const express = require('express');
const sequelize = require('../models/index');
// const Survey = require('../models/Survey');

const { Goal, Survey, ImprovementPlan } = sequelize.models;
const router = express.Router();

/**
 * @openapi
 * /api/goal:
 *   get:
 *     tags:
 *     - Goal
 *     summary: Get all user goals
 *     responses:
 *       200:
 *         description: Returns all user goals.
 */
router.get(
  '/goal',
  async (req, res) => {
    // check for guest user
    if (req.user == null) return res.status(200).json({ message: 'guest user' });

    const results = await Goal.findAll({
      where: { userId: req.user.id },
    }).catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

    if (!results) return res.status(404).send('User not found');

    // console.log(results);
    return res.status(200).json(results);
  },
);

/**
 * @openapi
 * /api/cpgoal:
 *   get:
 *     tags:
 *     - Goal
 *     summary: Get 2 completed goals.
 *     responses:
 *       200:
 *         description: Returns 2 completed goals.
 */
router.get(
  '/cpgoal',
  async (req, res) => {
    // check for guest user
    if (req.user == null) return res.status(200).json({ message: 'guest user' });

    const results = await Goal.findAll({
      where: { userId: req.user.id, completed: 1 },
      order: ['dueDate'],
      limit: 2,
    }).catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

    if (!results) return res.status(404).send('User not found');

    // console.log(results);
    return res.status(200).json(results);
  },
);

/**
 * @openapi
 * /api/ipgoal:
 *   get:
 *     tags:
 *     - Goal
 *     summary: Get 2 in-progress goals
 *     responses:
 *       200:
 *         description: Returns 2 in-progress goals.
 */
router.get(
  '/ipgoal',
  async (req, res) => {
    // check for guest user
    if (req.user == null) return res.status(200).json({ message: 'guest user' });

    const results = await Goal.findAll({
      where: { userId: req.user.id, completed: 0 },
      order: ['dueDate'],
      limit: 2,
    }).catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

    if (!results) return res.status(404).send('User not found');

    // console.log(results);
    return res.status(200).json(results);
  },
);

/**
 * @openapi
 * /api/create-goal:
 *   post:
 *     tags:
 *     - Goal
 *     summary: Add new goal for a user
 *     requestBody:
 *       description: The goal to create
 *       required: true
 *
 *     responses:
 *       201:
 *         description: New goal added
 *
 */
router.post('/create-goal', async (req, res) => {
  // check for guest user
  if (req.user == null) return res.status(200).json({ message: 'guest user' });
  const {
    title, goal, dueDate, survey, improvementPlan,
  } = req.body.newData;
  console.log(req.body.newData.title);
  console.log(title);
  const userId = req.user.id;

  // Validate request
  if (!title) {
    return res.status(400).send({
      message: 'Goal title cannot be empty!',
    });
  }

  // Find survey Id
  let surveyId = 0;
  if (survey) {
    const surveyObj = await Survey.findOne({
      where: { category: survey },
    });
    surveyId = surveyObj.id;
  }

  let improvementPlanId = 0;
  // Find improvementplan id
  if (improvementPlan) {
    const improvementPlanObj = await ImprovementPlan.findOne({
      where: { task: improvementPlan },
    });
    improvementPlanId = improvementPlanObj.id;
  }

  // Create a Goal
  const newGoal = {
    title,
    goal,
    dueDate,
    userId,
    completed: 0,
    surveyId: survey ? surveyId : null,
    improvementPlanId: improvementPlan ? improvementPlanId : null,
  };

  // Save Goal in the database
  Goal.create(newGoal)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
            err.message || 'Error occurred while creating the goal.',
      });
    });

  // Have this here because it needed a return value
  return res.status(200);
});

/**
 * @openapi
 * /api/remove-goal:
 *   post:
 *     tags:
 *     - Goal
 *     summary: Remove a goal
 *     requestBody:
 *       description: The goal to remove
 *       required: true
 *
 *     responses:
 *       201:
 *         description: Goal removed
 *
 */
router.post('/remove-goal', async (req, res) => {
  const { goalID } = req.body;
  console.log(req.body);
  await Goal.destroy({
    where: {
      id: goalID,
      userId: req.user.id,
    },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Goal was deleted successfully!',
        });
      } else {
        res.send({
          message: 'Cannot delete Goal.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Goal: ${err}`,
      });
    });
});

/**
 * @openapi
 * /api/update-goal:
 *   post:
 *     tags:
 *     - Goal
 *     summary: Update an existing goal
 *     requestBody:
 *       description: The goal to update
 *       required: true
 *
 *     responses:
 *       201:
 *         description: Goal was updated
 *
 */
router.post('/update-goal', async (req, res) => {
  // Note: currentSurvey should be null if there is no category attached to the goal
  const {
    currentTitle,
    newTitle,
    currentGoal,
    newGoal,
    currentDueDate,
    newDueDate,
    currentSurvey, // 4 category
    newSurvey, // 4 categorty
  } = req.body.newData;

  // Validate request
  if (!currentTitle) {
    console.log(currentTitle);
    res.status(400).send({
      message: 'Goal to update cannot be empty!',
    });
    return;
  }

  // Find survey Id
  let newSurveyId = 0;
  if (newSurvey) {
    const surveyObj = await Survey.findOne({
      where: { category: newSurvey },
    });
    newSurveyId = surveyObj.id;
  }

  await Goal.findOne({
    where: {
      title: currentTitle,
      goal: currentGoal,
      dueDate: currentDueDate,
      userId: req.user.id,
    },
  })
    .then((record) => {
      if (!record) {
        throw new Error('No record found');
      }

      const values = {
        title: newTitle === '' ? record.title : newTitle,
        goal: newGoal === '' ? record.goal : newGoal,
        dueDate: newDueDate === null ? record.dueDate : newDueDate,
        surveyId: newSurveyId === 0 ? currentSurvey : newSurveyId,
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

module.exports = router;
