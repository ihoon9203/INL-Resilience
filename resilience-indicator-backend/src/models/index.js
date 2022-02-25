/* eslint-disable global-require */
// Modified version of https://github.com/sequelize/express-example/tree/master/express-main-example/sequelize
const { Sequelize } = require('sequelize');
const config = require('../resources/config');

// Connect to database using Sequelize
const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging,
  },
);

const db = {};
const modelDefiners = [
  require('./User'),
  require('./Survey'),
  require('./Score'),
  require('./Question'),
  require('./Subcategory'),
  require('./Answer'),
  require('./CorrectAnswer'),
  require('./PossibleAnswer'),
  require('./Achievement'),
  require('./Achievement'),
  require('./Goal'),
  require('./ImprovementPlan'),
  require('./FeedbackCategory'),
  require('./Feedback'),
];

// We define all models according to their files.
modelDefiners.forEach((modelDefiner) => {
  const model = modelDefiner(sequelize);
  db[model.name] = model;
});

// Associations are not part of Sequelize lifecycle so they must be called manually
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// We export the sequelize connection instance to be used around our app
module.exports = sequelize;
