import express from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import surveyQuestions from './resources/survey-questions';

const app = express();

const pjson = require('../package.json');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Resilience Indicator API',
            version: '1.0.0'
        },
    },
    apis: ['src/server.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
 app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the Resilience Indicator API!'
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
 app.get('/api/version', (req, res) => {
    res.json({
        version: pjson.version
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
app.get('/api/survey-questions/:survey', (req, res) => {
    // TODO: hookup to DB when ready
    const surveyQuestionList = surveyQuestions[`${req.params.survey}`];

    if (!surveyQuestionList) return res.status(404).send(`Survey \"${req.params.survey}\" Not Found`);

    return res.status(200).send(surveyQuestionList.questions);
});

app.listen(8000, () => console.log('Listening on port 8000'));