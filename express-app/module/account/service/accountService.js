const Accounts = require('../model/accounts')
const Users = require('../../authentication/model/users')
const authService = require('../../authentication/service/authService')
const {v4: uuidv4} = require('uuid');
const defaultData = require('../../../resources/default/defaultData')

async function getAccountId(token) {
    let username = authService.findUsernameByToken(token);
    if (!username) {
        return false;
    }
    let data = await Users.findAll({
        attributes: ['account_id'],
        where: {
            username: username
        }
    });
    if (data.length > 0) {
        let user = data[0].get({plain: true});
        return user.account_id;
    } else {
        return false;
    }
}

async function createAccount() {
    let accountId = uuidv4();
    await Accounts.create({
        account_id: accountId,
        title: 'Music Enthusiast',
        description: 'Write something here',
        favorites: '[]',
        playlist: '[]',
        friends: '[]',
        avatar: defaultData.avatar,
        hero: defaultData.hero,
    });
    return accountId;
}

async function getAccount(token, attributes) {
    let accountId = await getAccountId(token);
    if (!accountId) {
        return false;
    }
    let data = await Accounts.findAll({
        attributes: attributes,
        where: {
            account_id: accountId
        }
    });
    if (data.length > 0) {
        return data[0].get({plain: true});
    } else {
        return false;
    }
}

module.exports = {
    getAccount: getAccount,
    createAccount: createAccount,
};