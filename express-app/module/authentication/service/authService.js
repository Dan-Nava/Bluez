const {v4: uuidv4} = require('uuid');
const Cache = require('ttl-cache');
const encryptionUtils = require('../../../utils/encryptionUtils');
const Users = require('../model/users');

const tokenCache = new Cache({
    ttl: 3600,
});

function findUsernameByToken(token) {
    return tokenCache.get(token);
}

function createToken(username) {
    let token = uuidv4();
    tokenCache.set(token, username);
    return token;
}

async function login(username, password) {
    let authed = await checkPassword(username, password);
    if (authed) {
        return createToken(username);
    } else {
        return false;
    }
}

function validateToken(username, token) {
    let cachedUsername = findUsernameByToken(token);
    return cachedUsername && username === cachedUsername;
}

function invalidateToken(username, token) {
    if (validateToken(username, token)) {
        tokenCache.del(token);
        return true;
    }
    return false;
}

async function checkPassword(username, password) {
    let data = await Users.findAll({
        where: {
            username: username
        }
    });
    if (data.length > 0) {
        let user = data[0].get({plain: true});
        return encryptionUtils.hash(password) === user.password_hashed;
    } else {
        return false;
    }
}

module.exports = {
    login: login,
    validateToken: validateToken,
    invalidateToken: invalidateToken,
    findUsernameByToken: findUsernameByToken,
};