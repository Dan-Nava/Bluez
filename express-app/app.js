const log = console.log;
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const loginRouter = require('./module/authentication/controller/loginController')

const app = express();

function init() {
    app.use(express.static(path.join(__dirname, '/public')))
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

let db = require('./utils/databaseUtils')
main();
module.exports = app;
