const Users = require('../../authentication/model/users');


async function getAllUsers() {
    let data = await Users.findAll();
    if (data.length > 0) {
        let users = [];
        for (let i = 0; i < data.length; i++) {
            users.push(data[i].get({plain: true}));
        }
        return users;
    } else {
        return false;
    }
}

async function banUser(username) {
    await Users.update({access_level: -1}, {
        where: {
            username: username
        }
    });
    return true;
}

async function restoreUser(username) {
    await Users.update({access_level: 0}, {
        where: {
            username: username
        }
    });
    return true;
}

async function addAdmin(username) {
    await Users.update({access_level: 1}, {
        where: {
            username: username
        }
    });
    return true;
}

module.exports = {
    getAllUsers: getAllUsers,
    banUser: banUser,
    restoreUser: restoreUser,
    addAdmin: addAdmin,
};