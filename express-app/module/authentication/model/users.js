const {DataTypes} = require('sequelize');
const db = require('../../../utils/databaseUtils')

const Users = db.define('users', {
        username: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password_hashed: DataTypes.STRING,
        account_id: DataTypes.STRING,
        access_level: DataTypes.INTEGER
    }, {
        timestamps: false
    }
);
module.exports = Users;