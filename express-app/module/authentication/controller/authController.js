const express = require('express');
const router = express.Router();
const authService = require('../service/authService')

router.post('/login', async function (request, response) {
    let username = request.body.username;
    let password = request.body.password;

    let token = await authService.login(username, password);
    if (!token) {
        response.status(400).end(JSON.stringify({message: 'Invalid username or password'}));
    } else {
        response.status(200).end(JSON.stringify({token: token}));
    }
});


router.post('/isLoggedIn', async function (request, response) {
    let username = request.body.username;
    let token = request.body.token;
    let isLoggedIn = authService.validateToken(username, token);
    if (!isLoggedIn) {
        response.status(400).end(JSON.stringify({loggedIn: false}));
    } else {
        response.status(200).end(JSON.stringify({loggedIn: true}));
    }
});

router.post('/logout', async function (request, response) {
    let username = request.body.username;
    let token = request.body.token;
    let success = authService.invalidateToken(username, token);
    if (!success) {
        response.status(400).end(JSON.stringify({success: false}));
    } else {
        response.status(200).end(JSON.stringify({success: true}));
    }
});

module.exports = router;