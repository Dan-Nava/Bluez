const configs = require('../config')
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize({
    database: configs.db_name,
    username: configs.db_user,
    password: configs.db_password,
    host: configs.db_host,
    port: configs.db_port,
    dialect: configs.db_type,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;