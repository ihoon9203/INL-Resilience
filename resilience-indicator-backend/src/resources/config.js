// TODO: remove this file in favor of ../config/config.json once we have sequelize working
let config;
if (process.env.DB_ENV === 'production') {
  config = {
    host: 'inl-database.cjkaigkjtd80.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'INL_res_cap5t0n3_21-22', // TODO: Remove password
    database: 'inl_db',
    dialect: 'mysql',
    logging: false,
  };
} else if (process.env.DB_ENV === 'development') {
  config = {
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'inl_db',
    dialect: 'mysql',
    logging: false,
  };
} else { // for CI
  config = {
    host: 'mysql',
    user: 'root',
    password: 'pass',
    database: 'inl_db',
    dialect: 'mysql',
    logging: false,
  };
}

module.exports = config;
