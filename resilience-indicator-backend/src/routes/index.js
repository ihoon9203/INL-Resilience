const express = require('express');
const adminApi = require('./admin');
const userApi = require('./user');
const infoApi = require('./info');
const surveyApi = require('./survey');
const scoreApi = require('./score');
const feedbackApi = require('./feedback');
const adminFeedbackApi = require('./admin/feedback');

const router = express.Router();

router.use(adminApi);
router.use(infoApi);
router.use(surveyApi);
router.use(userApi);
router.use(scoreApi);
router.use(feedbackApi);
router.use(adminFeedbackApi);

module.exports = router;
