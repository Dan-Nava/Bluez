const express = require('express');
const {DataTypes} = require("sequelize");
const router = express.Router();
const loginService = require('../service/loginService')

router.post('/login', (request, response) => {
    // let username = request.body.username;
    // let password = request.body.password;

    loginService.findAllUsers();
    response.end(JSON.stringify(request.body));
});

module.exports = router;