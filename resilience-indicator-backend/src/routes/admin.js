const express = require('express');
const sequelize = require('../models/index');

const {
  CorrectAnswer, ImprovementPlan, PossibleAnswer, Question, Subcategory, Survey,
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
 * /api/answers-and-tasks/{id}:
 *   get:
 *     tags:
 *     - Possible Answers, Improvement Plan
 *     summary: Get the possible answers and improvement plans for a specified question
 *     parameters:
 *     - name: id
 *       description: question id
 *       in: path
 *       required: true
 *       type: number
 *     responses:
 *       200:
 *         description: Returns list of possible answers and improvement plans
 *
 */
router.get('/answers-and-tasks/:id', async (req, res) => {
  const results = await PossibleAnswer.findAll({
    where: { questionId: req.params.id },
    include: [{ model: ImprovementPlan }],
  });
  if (!results) return res.status(404).send('Possible Answer Not Found');

  const returnVal = [];
  for (let i = 0; i < results.length; i += 1) {
    const item = {
      possibleAnswer: results[i].possibleAnswer,
      possibleAnswerId: results[i].id,
      improvementPlanId: results[i].ImprovementPlan ? results[i].ImprovementPlan.id : null,
      improvementPlanTask: results[i].ImprovementPlan ? results[i].ImprovementPlan.task : null,
      priority: results[i].ImprovementPlan ? results[i].ImprovementPlan.priority : null,
    };
    returnVal.push(item);
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
 * /api/create-whole-question:
 *   post:
 *     tags:
 *     - Question
 *     summary: Add new question, along with possible answers, correct answer, and
 *              improvement plan tasks, to a survey
 *     requestBody:
 *       description: The question, possible answers, correct answer, and improvement plan to create
 *       required: true
 *
 *     responses:
 *       201:
 *         description: New question added
 *
 */
router.post('/create-question', async (req, res) => {
  const {
    subcategoryId,
    question,
    weight,
    information,
    survey,
    improvementPlanValues,
    possibleAnswers,
    correctAnswer,
  } = req.body;

  // ********************** VALIDATE REQUEST
  if (!question || !Array.isArray(improvementPlanValues)
    || !survey || !possibleAnswers || !correctAnswer) {
    res.status(400).send({
      message: 'Items cannot be empty!',
    });
    return;
  }

  // Find survey ID
  const currentSurvey = await Survey.findOne({
    where: { category: survey },
    attributes: ['id'],
  });

  const surveyId = currentSurvey.id;

  // ********************** CREATE QUESTION
  const newQuestion = {
    subcategoryId,
    question,
    weight,
    information: information === '' ? null : information,
  };

  let questionId;
  await Question.create(newQuestion)
    .then((data) => {
      questionId = data.id;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error occurred while creating the question.',
      });
    });

  //  ******************* CREATE IMPROVEMENT PLANS

  const newImprovementPlans = [];

  // keep track of corresponding possibleAnswers
  const correspondingPossibleAnswers = [];

  improvementPlanValues.forEach((item) => {
    const {
      task, priority, possibleAnswer,
    } = item;

    // Validate improvement plan
    if (!task || !priority || !possibleAnswer) {
      res.status(400).send({
        message: 'Task cannot be empty!',
      });
      return;
    }

    const newImprovementPlan = {
      surveyId,
      task,
      priority,
    };

    newImprovementPlans.push(newImprovementPlan);
    correspondingPossibleAnswers.push(possibleAnswer);
  });

  const improvementPlanIds = [];

  await ImprovementPlan.bulkCreate(newImprovementPlans)
    .then((data) => {
      // add the possible answers to the data
      for (let i = 0; i < data.length; i += 1) {
        const item = {
          improvementplanId: data[i].id,
          possibleAnswer: correspondingPossibleAnswers[i],
        };
        improvementPlanIds.push(item);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error occurred while creating the improvement plan task.',
      });
    });

  // ********************** CREATE POSSIBLE ANSWERS

  const answersArr = [];

  possibleAnswers.forEach((possibleAnswer) => {
    let improvementPlanId = null;
    improvementPlanIds.forEach((item) => {
      if (item.possibleAnswer.trim() === possibleAnswer) {
        improvementPlanId = item.improvementplanId;
      }
    });

    const newPossibleAnswer = { questionId, possibleAnswer, improvementPlanId };
    answersArr.push(newPossibleAnswer);
  });

  await PossibleAnswer.bulkCreate(answersArr)
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error occurred while creating the possible answers.',
      });
    });

  // ***************** CREATE CORRECT ANSWER

  const newCorrectAnswer = {
    questionId,
    correctAnswer,
  };

  await CorrectAnswer.create(newCorrectAnswer)
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
 * /api/delete-question:
 *   delete:
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
router.delete('/delete-question', async (req, res) => {
  const { questionId } = req.body;

  // ******* VALIDATE REQUEST
  if (!questionId) {
    res.status(400).send({
      message: 'Question cannot be empty!',
    });
    return;
  }

  // ********* DELETE IMPROVEMENT PLAN

  const possibleAnswers = await PossibleAnswer.findAll({
    where: { questionId },
    attributes: ['improvementPlanId'],
  })
    .catch((err) => {
      res.status(500).send({
        message: `Could not find PossibleAnswer: ${err}`,
      });
    });

  const improvementPlanIds = [];

  possibleAnswers.forEach((item) => {
    improvementPlanIds.push(item.improvementPlanId);
  });

  await ImprovementPlan.destroy({ where: { id: improvementPlanIds } })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete improvement plan: ${err}`,
      });
    });

  // DELETE QUESTION
  await Question.destroy({
    where: { id: questionId },
  })
    .then(() => {
      res.sendStatus(200);
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
    questionId, correctAnswer,
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

/* @openapi
* /api/improvement-plan/{questionId}:
*   get:
*     tags:
*     - Question
*     summary: Get all improvement plans for a specified question
*     parameters:
*     - name: questionId
*       description: id of question
*       in: path
*       required: true
*       type: int
*     responses:
*       200:
*         description: Returns list of improvement plan tasks of a question
*
*/
router.get('/improvement-plan/:questionId', async (req, res) => {
  const possibleAnswers = await PossibleAnswer.findAll({
    where: { questionId: req.params.questionId },
    attributes: ['improvementPlanId'],
  })
    .catch((err) => {
      res.status(500).send({
        message: `Could not find PossibleAnswer: ${err}`,
      });
    });

  const improvementPlanIds = [];

  possibleAnswers.forEach((item) => {
    improvementPlanIds.push(item.improvementPlanId);
  });

  const results = await ImprovementPlan.findAll({
    where: { id: improvementPlanIds },
  });

  if (!results) return res.status(404).send('Improvement Plan Not Found');

  return res.status(200).json(results);
});

/**
 * @openapi
 * /api/update-possible-answers:
 *   post:
 *     tags:
 *     - PossibleAnswers
 *     summary: Update one or more existing possible answers
 *     requestBody:
 *       description: The updated possible answers and questionId
 *       required: true
 *
 *     responses:
 *       201:
 *         description: Possible answers were updated
 *
 */
router.post('/update-possible-answers', async (req, res) => {
  const { questionId, possibleAnswers } = req.body;

  // VALIDATE request
  if (!questionId || !possibleAnswers) {
    res.status(400).send({
      message: 'Items cannot be empty!',
    });
    return;
  }

  // get improvement plan ids
  const improvementPlans = await PossibleAnswer.findAll({
    where: { questionId },
    attributes: ['improvementPlanId', 'possibleAnswer'],
  })
    .catch((error) => {
      res.status(500).send({
        message: `Could not find PossibleAnswer: ${error}`,
      });
    });

  // *********** DELETE the Possible Answers
  await PossibleAnswer.destroy({ where: { questionId } })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete PossibleAnswer: ${err}`,
      });
    });

  // ********* INSERT the Possible Answers with same improvementPlanId

  const answersArr = [];

  possibleAnswers.forEach((possibleAnswer) => {
    let improvementPlanId = null;
    improvementPlans.forEach((item) => {
      if (item.possibleAnswer.trim() === possibleAnswer) {
        improvementPlanId = item.improvementplanId;
      }
    });

    const newPossibleAnswer = { questionId, possibleAnswer, improvementPlanId };
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
          err.message || 'Error occurred while creating the possible answers.',
      });
    });
});

/**
 * @openapi
 * /api/update-improvement-plan:
 *   post:
 *     tags:
 *     - ImprovementPlan
 *     summary: Update one or more existing improvement plan tasks
 *     requestBody:
 *       description: The question id that the improvement plan task is linked to
 *       required: true
 *
 *     responses:
 *       201:
 *         description: Improvement plan tasks were updated
 *
 */
router.post('/update-improvement-plan', async (req, res) => {
  const {
    questionId, survey, possibleAnswersArr, createImprovementPlanArr,
  } = req.body;

  // Find survey ID
  const currentSurvey = await Survey.findOne({
    where: { category: survey },
    attributes: ['id'],
  });
  const surveyId = currentSurvey.id;

  const updatedRecords = [];
  // Update specified improvement plan tasks

  // Find Possible answers to get improvementId
  const possibleAnswers = await PossibleAnswer.findAll({
    where: { questionId, possibleAnswer: possibleAnswersArr },
    attributes: ['improvementPlanId', 'possibleAnswer'],
  })
    .catch((err) => {
      res.status(500).send({
        message: `Could not find PossibleAnswer: ${err}`,
      });
    });

  /* eslint-disable no-await-in-loop */
  /* eslint-disable no-restricted-syntax */
  for (const answerItem of possibleAnswers) {
    const id = answerItem.improvementPlanId;
    const { possibleAnswer } = answerItem;

    // if improvement plan never existed, create it and update possibleAnswer to reference it
    if (!id) {
      let newImprovementPlanId;
      for (const item of createImprovementPlanArr) {
        if (item.possibleAnswer === possibleAnswer) {
          const {
            task, priority,
          } = item;

          // Validate request
          if (!task || !priority) {
            res.status(400).send({
              message: 'Improvement plan cannot be empty!',
            });
            return;
          }

          const newImprovementPlan = {
            surveyId,
            task,
            priority,
          };
          /* eslint-disable no-loop-func */
          await ImprovementPlan.create(newImprovementPlan)
            .then((data) => {
              newImprovementPlanId = data.id;
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message || 'Error occurred while creating the improvement plan task.',
              });
            });
          /* eslint-disable no-loop-func */
        }
      }
      // update possible answer improvementPLanId
      await PossibleAnswer.findOne({
        where: { questionId, possibleAnswer },
      })
        .then((record) => {
          if (!record) {
            throw new Error('No record found');
          }

          record.update({ improvementPlanId: newImprovementPlanId })
            .catch((err) => {
              res.status(500).send({
                message: `Could not update PossibleAnswer: ${err}`,
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: `Could not find PossibleAnswer: ${err}`,
          });
        });
    } else {
      await ImprovementPlan.findOne({
        where: { id, surveyId },
      })
        .then((record) => {
          if (!record) {
            throw new Error('No record found');
          }

          createImprovementPlanArr.forEach((newItem) => {
            if (newItem.possibleAnswer === possibleAnswer) {
              const {
                task, priority,
              } = newItem;

              // Validate request
              if (!task || !priority) {
                res.status(400).send({
                  message: 'Improvement plan cannot be empty!',
                });
                return;
              }

              const values = {
                task: task === '' ? record.task : task,
                priority: priority === '' ? record.priority : priority,
              };

              record.update(values)
                .then((updatedRecord) => {
                  updatedRecords.push(updatedRecord);
                })
                .catch((err) => {
                  res.status(500).send({
                    message: `Could not update Improvement Plan: ${err}`,
                  });
                });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  /* eslint-disable no-restricted-syntax */
  /* eslint-disable no-await-in-loop */
  res.status(200).send(updatedRecords);
});

/**
 * @openapi
 * /api/update-improvement-plan:
 *   post:
 *     tags:
 *     - ImprovementPlan
 *     summary: Update one or more existing improvement plan tasks
 *     requestBody:
 *       description: The question id that the improvement plan task is linked to
 *       required: true
 *
 *     responses:
 *       201:
 *         description: Improvement plan tasks were updated
 *
 */
router.post('/update-answer', async (req, res) => {
  const { survey, taskValues } = req.body;

  // Find survey ID
  const currentSurvey = await Survey.findOne({
    where: { category: survey },
    attributes: ['id'],
  });

  const surveyId = currentSurvey.id;

  const updatedRecords = [];

  /* eslint-disable no-await-in-loop */
  for (const item of taskValues) {
    const {
      possibleAnswerId, improvementPlanId, possibleAnswer, improvementPlanTask, priority,
    } = item;
    let newImprovementPlanId;

    // Add the improvement plan if it didn't exist before
    if (!improvementPlanId && improvementPlanTask) {
      const newImprovementPlan = {
        surveyId,
        task: improvementPlanTask,
        priority,
      };
      await ImprovementPlan.create(newImprovementPlan)
        .then((data) => {
          newImprovementPlanId = data.id;
          updatedRecords.push(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    await PossibleAnswer.findOne({
      where: { id: possibleAnswerId },
    })
      .then((record) => {
        if (!record) {
          throw new Error('No record found');
        }

        const values = {
          possibleAnswer: possibleAnswer === '' ? record.possibleAnswer : possibleAnswer,
          improvementPlanId: (!improvementPlanId && improvementPlanTask)
            ? newImprovementPlanId : record.improvementPlanId,
        };

        record.update(values)
          .then((updatedRecord) => {
            updatedRecords.push(updatedRecord);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    if (!improvementPlanId && improvementPlanTask) {
      await ImprovementPlan.findOne({
        where: { id: improvementPlanId },
      })
        .then((record) => {
          if (!record) {
            throw new Error('No record found');
          }

          const values = {
            task: improvementPlanTask === '' ? record.task : improvementPlanTask,
            priority: priority || record.priority,
          };

          record.update(values)
            .then((updatedRecord) => {
              updatedRecords.push(updatedRecord);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  /* eslint-disable no-await-in-loop */
  return res.status(200).json(updatedRecords);
});

module.exports = router;
