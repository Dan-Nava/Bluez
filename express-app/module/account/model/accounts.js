const {DataTypes} = require('sequelize');
const db = require('../../../utils/databaseUtils')

const Accounts = db.define('accounts', {
        account_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        title: DataTypes.INTEGER,
        description: DataTypes.INTEGER,
        favorites: DataTypes.INTEGER,
        playlist: DataTypes.INTEGER,
        friends: DataTypes.INTEGER,
        avatar: DataTypes.INTEGER,
        hero: DataTypes.INTEGER,
    }, {
        timestamps: false
    }
);
module.exports = Accounts;