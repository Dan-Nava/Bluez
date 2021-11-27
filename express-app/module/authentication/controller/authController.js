const express = require('express');
const router = express.Router();
const loginService = require('../service/authService')

router.post('/login', (request, response) => {
    // let username = request.body.username;
    // let password = request.body.password;

    loginService.findAllUsers();
    response.end(JSON.stringify(request.body));
});

module.exports = router;