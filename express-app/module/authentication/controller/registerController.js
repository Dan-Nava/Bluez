const express = require('express');
const router = express.Router();

const registrationService = require('../service/registerService')
router.post('/register', async function (request, response) {
    let username = request.body.username;
    let password = request.body.password;

    let success = await registrationService.register(username, password);
    if (!success) {
        response.status(400).end(JSON.stringify({message: 'Invalid username or password'}));
    } else {
        response.status(200).end(JSON.stringify({success: true}));
    }
});

module.exports = router;