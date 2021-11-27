const express = require('express');
const bodyParser = require("body-parser");
require('./utils/databaseUtils')

const loginRouter = require('./module/authentication/controller/authController')

const log = console.log;

const app = express();

function init() {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use("/", loginRouter);
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
