const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
require('./utils/databaseUtils')

const authRouter = require('./module/authentication/controller/authController')
const registerRouter = require('./module/authentication/controller/registerController')
const musicRouter = require('./module/music/controller/musicController')
const adminRouter = require('./module/admin/controller/adminController')
const accountRouter = require('./module/account/controller/accountController')

const log = console.log;

const app = express();

function init() {
    app.use(cors({
        origin: '*'
    }));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use("/", authRouter);
    app.use("/", registerRouter);
    app.use("/music", musicRouter);
    app.use("/admin", adminRouter);
    app.use("/account", accountRouter);
}

function start() {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        log(`Listening on port ${port}...`)
    })
}

function main() {
    init();
    start();
}

main();
module.exports = app;
