const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const config = require('../resources/config');

// Set up session store
const mysqlStoreOptions = {
  user: config.user,
  password: config.password,
  host: config.host,
  database: config.database,
  createDatabaseTable: true,
  endConnectionOnClose: true,
};
const sessionStore = new MysqlStore(mysqlStoreOptions);

module.exports = sessionStore;
