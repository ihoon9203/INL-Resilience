import express from 'express';
import cors from 'cors';
import surveyQuestions from './resources/survey-questions';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/survey-questions/:survey', (req, res) => {
    // TODO: hookup to DB when ready
    const surveyQuestionList = surveyQuestions[`${req.params.survey}`];

    if (!surveyQuestionList) return res.status(404).send("survey Not Found");

    return res.status(200).send(surveyQuestionList.questions);
})

app.listen(8000, () => console.log('Listening on port 8000'));