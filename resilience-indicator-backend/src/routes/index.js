const express = require('express');
const adminApi = require('./admin');
const userApi = require('./user');
const infoApi = require('./info');
const surveyApi = require('./survey');
const scoreApi = require('./score');
const goalApi = require('./goal');
const feedbackApi = require('./feedback');
const adminFeedbackApi = require('./admin/feedback');
const improvementPlanApi = require('./improvement-plan');

const router = express.Router();

router.use(adminApi);
router.use(infoApi);
router.use(surveyApi);
router.use(userApi);
router.use(scoreApi);
router.use(goalApi);
router.use(feedbackApi);
router.use(adminFeedbackApi);
router.use(improvementPlanApi);

module.exports = router;
