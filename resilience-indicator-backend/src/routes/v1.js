const express = require('express');
const surveyAnswers = require('../resources/survey-answers');
const pjson = require('../../package.json');
const Db = require('../resources/database');
const config = require('../resources/config');
// FIXME: workaround until we use sequelize
config.database = 'inl_db';

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
router.get('/survey-questions/:survey', (req, res) => {
  const connection = new Db(config);
  const query = `SELECT Question, Subquestion FROM Surveys NATURAL JOIN Questions AS q
        LEFT JOIN Subquestions AS sq ON q.QuestionId = sq.QuestionId
        WHERE SurveyCategory = "${req.params.survey}";`;
  connection.query(query, (_, results) => {
    // put results into a form the frontend expects
    const resultsDict = { questions: [] };
    for (let i = 0; i < results.length; i += 1) {
      const question = results[i].Question;
      const subquestion = results[i].Subquestion;
      let index = resultsDict.questions.findIndex((e) => e.text === question);
      if (index !== -1 && subquestion !== null) {
        resultsDict.questions[index].subquestions.push({ text: subquestion });
      } else {
        index = resultsDict.questions.push({ text: question, subquestions: [] }) - 1;
        if (subquestion !== null) {
          resultsDict.questions[index].subquestions.push({ text: subquestion });
        }
      }
    }
    connection.close();
    if (resultsDict.questions.length === 0) return res.status(404).send(`Survey "${req.params.survey}" Not Found`);
    return res.status(200).send(resultsDict.questions);
  });
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
