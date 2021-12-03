const Music = require('../model/music');
const path = require("path");

async function getInfo(name) {
    let data = await Music.findAll({
        attributes: ['info'],
        where: {
            name: name
        }
    });
    if (data.length > 0) {
        return data[0].get({plain: true});
    } else {
        return false;
    }
}

async function getLyrics(name) {
    let data = await Music.findAll({
        attributes: ['timestamps', 'lyrics'],
        where: {
            name: name
        }
    });
    if (data.length > 0) {
        return data[0].get({plain: true});
    } else {
        return false;
    }
}

async function getChords(name) {
    let data = await Music.findAll({
        attributes: ['timestamps', 'chords'],
        where: {
            name: name
        }
    });
    if (data.length > 0) {
        return data[0].get({plain: true});
    } else {
        return false;
    }
}

async function getAudio(name) {
    let data = await Music.findAll({
        attributes: ['song_file'],
        where: {
            name: name
        }
    });
    if (data.length > 0) {
        let music = data[0].get({plain: true});
        return path.join(__dirname, '../../../resources/audio', music.song_file);
    } else {
        return false;
    }
}

async function getVideo(name) {
    let data = await Music.findAll({
        attributes: ['video_file'],
        where: {
            name: name
        }
    });
    if (data.length > 0) {
        let music = data[0].get({plain: true});
        return path.join(__dirname, '../../../resources/video', music.video_file);
    } else {
        return false;
    }
}

module.exports = {
    getInfo: getInfo,
    getLyrics: getLyrics,
    getChords: getChords,
    getAudio: getAudio,
    getVideo: getVideo,
};