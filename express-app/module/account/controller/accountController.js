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
            attributes = ['title', 'description'];
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

module.exports = router;