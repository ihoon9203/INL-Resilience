// TODO: remove this file in favor of ../config/config.json once we have sequelize working
let config;
if (process.env.DB_ENV === 'production') {
  config = {
    host: 'inl-database.cjkaigkjtd80.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'INL_res_cap5t0n3_21-22', // TODO: Remove password
  };
} else if (process.env.DB_ENV === 'development') {
  config = {
    host: 'localhost',
    user: 'root',
    password: 'pass',
  };
} else { // for CI
  config = {
    host: 'mysql',
    user: 'root',
    password: 'pass',
  };
}

module.exports = config;
