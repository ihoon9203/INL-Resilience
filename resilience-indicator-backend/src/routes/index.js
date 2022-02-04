const express = require('express');
const adminApi = require('./admin');
const userApi = require('./user');
const infoApi = require('./info');
const surveyApi = require('./survey');

const router = express.Router();

router.use(adminApi);
router.use(infoApi);
router.use(surveyApi);
router.use(userApi);

module.exports = router;
