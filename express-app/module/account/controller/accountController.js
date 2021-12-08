const express = require('express');
const router = express.Router();
const accountService = require('../service/accountService')

router.get('/:attr', async function (request, response) {
    /*
    /account/:attr?token=token
     */
    let token = request.query.token
    let attr = request.params.attr
    let attributes = []
    switch (attr) {
        case 'info':
            attributes = ['name', 'title', 'description'];
            break;
        case 'avatar':
            attributes = ['avatar'];
            break;
        case 'hero':
            attributes = ['hero'];
            break;
        case 'playlist':
            attributes = ['playlist'];
            break;
        case 'favorites':
            attributes = ['favorites'];
            break;
    }
    let account = await accountService.getAccount(token, attributes);
    if (account === false) {
        response.status(400).end(JSON.stringify({message: 'Invalid token'}));
    } else {
        response.status(200).end(JSON.stringify({account: account}));
    }
});

router.post('/update', async function (request, response) {
    /*
    {
        token:token,
        newValues: {newValues}
    }
     */
    let token = request.body.token;
    let newValues = request.body.newValues;
    let success = accountService.updateAccount(token, newValues);
    if (!success) {
        response.status(400).end(JSON.stringify({success: false}));
    } else {
        response.status(200).end(JSON.stringify({success: true}));
    }
});

module.exports = router;