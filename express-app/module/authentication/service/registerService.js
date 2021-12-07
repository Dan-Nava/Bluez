const encryptionUtils = require('../../../utils/encryptionUtils');
const Users = require('../model/users');
const accountService = require('../../account/service/accountService')

async function register(username, password) {
    let data = await Users.findAll({
        where: {
            username: username
        }
    });
    if (data.length > 0) {
        return false;
    } else {
        let accountId = await accountService.createAccount();
        await Users.create({
            username: username,
            password_hashed: encryptionUtils.hash(password),
            account_id: accountId,
            access_level: 0
        });
        return true;
    }
}

module.exports = {
    register: register,
};