// TODO: remove this file in favor of ../config/config.json once we have sequelize working
if (process.env.DB_ENV == "production") {
    var config = {
        host: "inl-database.cjkaigkjtd80.us-east-2.rds.amazonaws.com",
        user: "admin",
        password: "INL_res_cap5t0n3_21-22" //TODO: Remove password
    };
} else {
    var config = {
        host: "localhost",
        user: "root",
        password: "pass"
    };
}

module.exports = config;