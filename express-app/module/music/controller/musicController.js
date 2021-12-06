const express = require('express');
const router = express.Router();
const musicService = require('../service/musicService')
const adminService = require("../service/adminService");

router.get('/info', async function (request, response) {
    /*
    /music/info?name=name
     */
    let name = request.query.name;
    let music = await musicService.getInfo(name);
    if (music === false) {
        response.status(400).end(JSON.stringify({message: 'Invalid song name'}));
    } else {
        response.status(200).end(JSON.stringify({info: music.info}));
    }
});

router.get('/lyrics', async function (request, response) {
    /*
    /music/lyrics?name=name
     */
    let name = request.query.name;
    let music = await musicService.getLyrics(name);
    if (music === false) {
        response.status(400).end(JSON.stringify({message: 'Invalid song name'}));
    } else {
        response.status(200).end(JSON.stringify({timestamps: music.timestamps, lyrics: music.lyrics}));
    }
});

router.get('/chords', async function (request, response) {
    /*
    /music/chords?name=name
     */
    let name = request.query.name;
    let music = await musicService.getChords(name);
    if (music === false) {
        response.status(400).end(JSON.stringify({message: 'Invalid song name'}));
    } else {
        response.status(200).end(JSON.stringify({timestamps: music.timestamps, lyrics: music.chords}));
    }
});

router.get('/audio', async function (request, response) {
    /*
    /music/audio?name=name
     */
    let name = request.query.name;
    let file = await musicService.getAudio(name);
    if (file === false) {
        response.status(400).end(JSON.stringify({message: 'Invalid song name'}));
    } else {
        response.status(200).sendFile(file);
    }
});

router.get('/video', async function (request, response) {
    /*
    /music/video?name=name
     */
    let name = request.query.name;
    let file = await musicService.getVideo(name);
    if (file === false) {
        response.status(400).end(JSON.stringify({message: 'Invalid song name'}));
    } else {
        response.status(200).sendFile(file);
    }
});

router.get('/all', async function (request, response) {
    /*
    /music/all
     */
    let names = await adminService.getAllUsers();
    if (names === false) {
        response.status(404).end(JSON.stringify({message: 'No songs found'}));
    } else {
        response.status(200).end(JSON.stringify({names: names}));
    }
});

module.exports = router;