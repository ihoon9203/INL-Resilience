/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');
const sequelize = require('../models/index');

const { NotificationSetting } = sequelize.models;
const router = express.Router();

/* --------------- NOTIFICATION SETTINGS --------------- */

/**
 * @openapi
 * /api/notification-settings:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Profile
 *     summary: Get notification settings for this user
 *     responses:
 *       200:
 *         description: Returns notification settings for this user
 */
router.get(
  '/notification-settings',
  ensureLoggedIn(),
  async (req, res) => {
    const results = await NotificationSetting.findAll({
      where: { userId: req.user.id },
    }).catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

    if (!results) return res.status(404).send('User not found');

    const returnVal = {};
    results.forEach((r) => {
      returnVal[r.setting] = r.enabled;
    });

    return res.status(200).json({
      returnNotifSettings: returnVal,
      userObj: req.user,
    });
  },
);

/**
 * @openapi
 * /api/notification-settings:
 *   put:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Profile
 *     summary: Update notification settings for this user
 *     requestBody:
 *       description: New notification settings
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationSettingsUpdateInSchema'
 *           examples:
 *             example1:
 *               summary: example1
 *               value:
 *                 General: true
 *                 Financial: true
 *                 Cyber: true
 *                 Health: true
 *                 Emergency: true
 *     responses:
 *       200:
 *         description: Notification settings updated
 *
 * components:
 *   schemas:
 *     NotificationSettingsUpdateInSchema:
 *       title: NotificationSettingsUpdateInSchema
 *       type: object
 *       properties:
 *         General:
 *           type: boolean
 *         Financial:
 *           type: boolean
 *         Cyber:
 *           type: boolean
 *         Health:
 *           type: boolean
 *         Emergency:
 *           type: boolean
 */
router.put(
  '/notification-settings',
  ensureLoggedIn(),
  async (req, res) => {
    const {
      General, Financial, Cyber, Health, Emergency,
    } = req.body;

    const settings = [
      'General',
      'Financial',
      'Cyber',
      'Health',
      'Emergency',
    ];

    const settingsMap = {
      General,
      Financial,
      Cyber,
      Health,
      Emergency,
    };

    settings.forEach(async (s) => {
      const result = await NotificationSetting.findOne({
        where: { userId: req.user.id, setting: s },
      }).catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

      result.enabled = settingsMap[s];

      const savedresult = await result.save().catch((err) => {
        console.log('Error: ', err);
        res.status(500).json({ error: `Cannot save ${s} notification setting at the moment!` });
      });
      if (!savedresult) return res.status(500).json({ error: `Cannot save ${s} notification setting at the moment!` });
    });

    return res.status(200).json({ message: 'Notification settings updated!' });
  },
);

module.exports = router;
