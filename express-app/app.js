const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
require('./utils/databaseUtils')

const authRouter = require('./module/authentication/controller/authController')
const registerRouter = require('./module/authentication/controller/registerController')

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
}

const encryptionUtils = require('./utils/encryptionUtils');
function start() {
    console.log(encryptionUtils.hash("test"))
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
