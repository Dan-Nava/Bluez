const {DataTypes} = require('sequelize');
const db = require('../../../utils/databaseUtils')

const Music = db.define('music', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        info: DataTypes.STRING,
        timestamps: DataTypes.STRING,
        lyrics: DataTypes.STRING,
        chords: DataTypes.STRING,
        song_file: DataTypes.STRING,
        video_file: DataTypes.STRING,
        album_art: DataTypes.STRING,
    }, {
        timestamps: false
    }
);
module.exports = Music;