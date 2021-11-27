let Users = require('../model/users')


function findAllUsers() {
    Users.findAll().then(data => {
        data.map((node) => {
            let user = node.get({plain: true});
            console.log(user)
        })
    }).catch(err => console.log(err));
}
module.exports = {
    findAllUsers: findAllUsers,
};