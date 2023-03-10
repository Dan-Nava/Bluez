const express = require('express');
const router = express.Router();

const registrationService = require('../service/registerService')
router.post('/register', async function (request, response) {
    /*
    {
        username: str,
        password: str
    }
     */
    let username = request.body.username;
    let password = request.body.password;

    let success = await registrationService.register(username, password);
    if (!success) {
        response.status(400).end(JSON.stringify({message: 'Username already taken'}));
    } else {
        response.status(200).end(JSON.stringify({success: true}));
    }
});

module.exports = router;