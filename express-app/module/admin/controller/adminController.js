const express = require('express');
const router = express.Router();
const adminService = require('../service/adminService')

const authService = require('../../authentication/service/authService')

router.get('/users', async function (request, response) {
    /*
    /admin/users?token=token
     */
    let token = request.query.token;
    let accessLevel = await authService.accessLevel(token);
    if (accessLevel < 1) {
        response.status(401).end(JSON.stringify({message: 'Not enough access level'}));
    } else {
        let users = await adminService.getAllUsers();
        if (users === false) {
            response.status(404).end(JSON.stringify({message: 'Not users found'}));
        } else {
            response.status(200).end(JSON.stringify({users: users}));
        }
    }
});

router.post('/ban', async function (request, response) {
    /*
    {
        token: str,
        username: str
    }
     */
    let username = request.body.username;
    let token = request.body.token;
    let accessLevel = await authService.accessLevel(token);
    if (accessLevel < 1) {
        response.status(401).end(JSON.stringify({message: 'Not enough access level'}));
    } else {
        let success = await adminService.banUser(username);
        if (success === false) {
            response.status(404).end(JSON.stringify({message: 'Not users found'}));
        } else {
            response.status(200).end(JSON.stringify({success: true}));
        }
    }
});

router.post('/restore', async function (request, response) {
    /*
    {
        token: str,
        username: str
    }
     */
    let username = request.body.username;
    let token = request.body.token;
    let accessLevel = await authService.accessLevel(token);
    if (accessLevel < 1) {
        response.status(401).end(JSON.stringify({message: 'Not enough access level'}));
    } else {
        let success = await adminService.restoreUser(username);
        if (success === false) {
            response.status(404).end(JSON.stringify({message: 'Not users found'}));
        } else {
            response.status(200).end(JSON.stringify({success: true}));
        }
    }
});

router.post('/add', async function (request, response) {
    /*
    {
        token: str,
        username: str
    }
     */
    let username = request.body.username;
    let token = request.body.token;
    let accessLevel = await authService.accessLevel(token);
    if (accessLevel < 1) {
        response.status(401).end(JSON.stringify({message: 'Not enough access level'}));
    } else {
        let success = await adminService.addAdmin(username);
        if (success === false) {
            response.status(404).end(JSON.stringify({message: 'Not users found'}));
        } else {
            response.status(200).end(JSON.stringify({success: true}));
        }
    }
});

module.exports = router;