const Music = require('../model/music');
const path = require("path");

async function getAll() {
    let data = await Music.findAll({
        attributes: ['name']
    });
    if (data.length > 0) {
        let names = [];
        for (let i = 0; i < data.length; i++) {
            names.push(data[i].get({plain: true}));
        }
        return names;
    } else {
        return false;
    }
}

async function getInfo(name) {
    name = name.toLowerCase();
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
    name = name.toLowerCase();
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
    name = name.toLowerCase();
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

async function getAlbumArt(name) {
    name = name.toLowerCase();
    let data = await Music.findAll({
        attributes: ['album_art'],
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
    name = name.toLowerCase();
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
    name = name.toLowerCase();
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
    getAll: getAll,
    getInfo: getInfo,
    getLyrics: getLyrics,
    getChords: getChords,
    getAlbumArt: getAlbumArt,
    getAudio: getAudio,
    getVideo: getVideo,
};