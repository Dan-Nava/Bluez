const encryptionUtils = require('../../../utils/encryptionUtils');
const Users = require('../model/users');

async function register(username, password) {
    let data = await Users.findAll({
        where: {
            username: username
        }
    });
    if (data.length > 0) {
        return false;
    } else {
        await Users.create({
            username: username,
            password_hashed: encryptionUtils.hash(password),
            account_id: '',
            access_level: 0
        });
        return true;
    }
}

module.exports = {
    register: register,
};